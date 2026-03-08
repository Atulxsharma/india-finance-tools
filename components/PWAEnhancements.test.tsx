import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PWAEnhancements } from "@/components/PWAEnhancements";

describe("PWAEnhancements", () => {
  beforeEach(() => {
    localStorage.clear();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        media: "",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    Object.defineProperty(window.navigator, "serviceWorker", {
      configurable: true,
      value: {
        register: vi.fn().mockResolvedValue(undefined),
      },
    });

    Object.defineProperty(window.navigator, "userAgent", {
      configurable: true,
      value:
        "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 Chrome/122.0.0.0 Mobile Safari/537.36",
    });
  });

  it("reveals the install prompt only after calculator engagement and browser support", () => {
    render(<PWAEnhancements />);

    expect(screen.queryByText("Keep India Tools on your phone")).not.toBeInTheDocument();

    localStorage.setItem("india-tools:calculator-engaged", "1");
    act(() => {
      window.dispatchEvent(new Event("india-tools:calculator-engaged"));
    });

    const promptEvent = new Event("beforeinstallprompt");
    Object.assign(promptEvent, {
      prompt: vi.fn().mockResolvedValue(undefined),
      userChoice: Promise.resolve({ outcome: "accepted", platform: "web" }),
    });

    act(() => {
      fireEvent(window, promptEvent);
    });

    expect(screen.getByText("Add India Tools to your home screen")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Install" })).toBeInTheDocument();
  });
});
