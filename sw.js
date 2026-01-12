const CACHE_NAME = "oraclemind-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./logo.png",
  "./genie_idle.png",
  "./genie_think.png",
  "./genie_win.png",
  "./genie_lose.png",
  "./icon-192.png",
  "./icon-512.png"
];

// Install the App (Cache files)
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Load files from Cache (Offline Support)
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
