/* eslint-disable no-restricted-globals */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('your-cache-name').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/icon-192x192.png',
        '/icon-512x512.png',
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
