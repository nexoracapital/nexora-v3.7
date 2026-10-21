const CACHE_NAME = 'nexora-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/eduhub.html',
  '/smart-tools.html',
  '/mockup-test.html',
  '/nexora-logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
