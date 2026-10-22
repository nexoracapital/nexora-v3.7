const CACHE_NAME = 'nexora-v5'; // ورژن v5 کر دیا گیا ہے تاکہ پرانی کیشے فوراً ڈیلیٹ ہو جائے
const urlsToCache = [
  '/',
  '/index.html',
  '/eduhub.html',
  '/smart-tools.html',
  '/school.html',
  '/nexora-logo.png'
];

// 1. Install Event (نیا ورکر فورا انسٹال ہو)
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. Activate Event (پرانے تمام v1, v2, v3, v4 کیشے فوراً ڈیلیٹ ہوں)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Network First Strategy (پہلے تازہ فائل نیٹ ورک سے لائے، اگر نیٹ نہ ہو تب کیشے دیکھے)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
