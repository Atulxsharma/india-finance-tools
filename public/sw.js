const CACHE_NAME = "india-tools-shell-v2";
const RUNTIME_CACHE = "india-tools-runtime-v2";
const APP_SHELL = [
  "/",
  "/tools/salary-calculator",
  "/tools/gst-calculator",
  "/tools/emi-calculator",
  "/tools/sip-calculator",
  "/tools/income-tax-calculator",
  "/tools/ppf-calculator",
  "/tools/fd-calculator",
  "/tools/gratuity-calculator",
  "/manifest.webmanifest",
  "/icons/192",
  "/icons/512",
  "/apple-icon",
  "/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(event.request);
          return cachedPage || caches.match("/");
        }),
    );
    return;
  }

  const shouldCache =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/manifest.webmanifest" ||
    event.request.destination === "style" ||
    event.request.destination === "script" ||
    event.request.destination === "font" ||
    event.request.destination === "image";

  if (!shouldCache) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => cachedResponse);

      return cachedResponse || networkFetch;
    }),
  );
});
