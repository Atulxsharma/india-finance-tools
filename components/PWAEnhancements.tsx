"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

const CALCULATOR_ENGAGED_EVENT = "india-tools:calculator-engaged";
const CALCULATOR_ENGAGED_KEY = "india-tools:calculator-engaged";
const INSTALL_DISMISSED_KEY = "india-tools:install-dismissed-at";
const PWA_STATE_EVENT = "india-tools:pwa-state-change";
const DISMISS_WINDOW_MS = 1000 * 60 * 60 * 24 * 7;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

declare global {
  interface WindowEventMap {
    "india-tools:calculator-engaged": Event;
    "india-tools:pwa-state-change": Event;
  }

  interface Navigator {
    standalone?: boolean;
  }
}

function hasDismissedPromptRecently() {
  if (typeof window === "undefined") {
    return false;
  }

  const dismissedAt = window.localStorage.getItem(INSTALL_DISMISSED_KEY);

  if (!dismissedAt) {
    return false;
  }

  return Date.now() - Number(dismissedAt) < DISMISS_WINDOW_MS;
}

function isStandaloneDisplayMode() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true
  );
}

function isIosSafari() {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = window.navigator.userAgent;
  const isIos = /iphone|ipad|ipod/i.test(userAgent);
  const isSafari = /safari/i.test(userAgent) && !/crios|fxios|edgios/i.test(userAgent);

  return isIos && isSafari;
}

type BrowserInstallState = {
  dismissed: boolean;
  hasEngaged: boolean;
  isInstalled: boolean;
  isIosInstallHint: boolean;
};

const defaultBrowserInstallState: BrowserInstallState = {
  dismissed: false,
  hasEngaged: false,
  isInstalled: false,
  isIosInstallHint: false,
};

function getBrowserInstallState(): BrowserInstallState {
  if (typeof window === "undefined") {
    return defaultBrowserInstallState;
  }

  return {
    dismissed: hasDismissedPromptRecently(),
    hasEngaged: window.localStorage.getItem(CALCULATOR_ENGAGED_KEY) === "1",
    isInstalled: isStandaloneDisplayMode(),
    isIosInstallHint: isIosSafari(),
  };
}

function getBrowserInstallStateSnapshot() {
  return JSON.stringify(getBrowserInstallState());
}

function subscribeToBrowserInstallState(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener(CALCULATOR_ENGAGED_EVENT, onChange);
  window.addEventListener(PWA_STATE_EVENT, onChange);
  window.addEventListener("appinstalled", onChange);
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(CALCULATOR_ENGAGED_EVENT, onChange);
    window.removeEventListener(PWA_STATE_EVENT, onChange);
    window.removeEventListener("appinstalled", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function PWAEnhancements() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const browserInstallStateSnapshot = useSyncExternalStore(
    subscribeToBrowserInstallState,
    getBrowserInstallStateSnapshot,
    () => JSON.stringify(defaultBrowserInstallState),
  );
  const browserInstallState = useMemo(
    () => JSON.parse(browserInstallStateSnapshot) as BrowserInstallState,
    [browserInstallStateSnapshot],
  );

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const canRegister =
      window.location.protocol === "https:" || window.location.hostname === "localhost";

    if (!canRegister) {
      return;
    }

    void navigator.serviceWorker.register("/sw.js", { scope: "/" });
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  if (
    browserInstallState.isInstalled ||
    browserInstallState.dismissed ||
    !browserInstallState.hasEngaged
  ) {
    return null;
  }

  const canPromptInstall = deferredPrompt !== null;

  if (!canPromptInstall && !browserInstallState.isIosInstallHint) {
    return null;
  }

  const dismiss = () => {
    window.localStorage.setItem(INSTALL_DISMISSED_KEY, String(Date.now()));
    window.dispatchEvent(new Event(PWA_STATE_EVENT));
  };

  const install = async () => {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome !== "accepted") {
      dismiss();
      return;
    }

    setDeferredPrompt(null);
    window.dispatchEvent(new Event(PWA_STATE_EVENT));
  };

  return (
    <aside className="install-prompt card" aria-live="polite">
      <div className="install-copy">
        <p className="eyebrow">Add to phone</p>
        <h2>Add India Tools to your home screen</h2>
        <p>
          Open salary, tax, EMI, and SIP tools in one tap next time.
        </p>
      </div>
      <div className="install-actions">
        {canPromptInstall ? (
          <button className="button button-primary" type="button" onClick={install}>
            Install
          </button>
        ) : null}
        {!canPromptInstall && browserInstallState.isIosInstallHint ? (
          <p className="install-instruction">
            On iPhone, tap Share and choose Add to Home Screen.
          </p>
        ) : null}
        <button
          aria-label="Dismiss install prompt"
          className="button button-secondary"
          type="button"
          onClick={dismiss}
        >
          Not now
        </button>
      </div>
    </aside>
  );
}
