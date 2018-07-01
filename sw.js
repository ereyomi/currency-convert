console.log('serviceworker is working');
const CONVERTER_CACHE = 'converter-Cache-v1';
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CONVERTER_CACHE).then((cache) => {
      return cache.addAll([
        '/',
        'js/ere.js',
        'css/ere.css',
        'https://free.currencyconverterapi.com/api/v5/currencies'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('converter-Cache-') &&
            cacheName !== CONVERTER_CACHE;
        }).map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();

            caches.open(CONVERTER_CACHE)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        )
      })
  )
});

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
