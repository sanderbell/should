/* eslint-disable no-restricted-globals */

const filesToCache = ['/', '/index.html', '/styles.css', '/script.js'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('my-name').then(function (cache) {
      return cache.addAll(filesToCache);
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
