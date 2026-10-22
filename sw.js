const CACHE_NAME = 'nexora-v4'; // ورژن تبدیل کر دیا گیا
const urlsToCache = [
  '/',
  '/index.html',
  '/eduhub.html',
  '/smart-tools.html',
  '/mockup-test.html',
  '/nexora-logo.png'
];

// 1. نئے سروس ورکر کو فوری ایکٹو کریں
self.addEventListener('install', event => {
  self.skipWaiting(); // پرانے ورکر کا انتظار ختم
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 2. تمام پرانے کیشے (v1, v2 وغیرہ) کو جڑ سے ڈیلیٹ کریں
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache); // پرانا ڈیٹا ختم
          }
        })
      );
    })
  );
  return self.clients.claim(); // فوری طور پر نئے پیج کا کنٹرول سنبھال لیں
});

// 3. نیٹ ورک فرسٹ (Network First): پہلے لائیو فائل چیک کرے گا تاکہ اپڈیٹ فوری نظر آئے
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // لائیو فائل کو کیش میں بھی اپڈیٹ کر دے گا
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request)) // اگر انٹرنیٹ بند ہو تب صرف کیش دکھائے
  );
});
