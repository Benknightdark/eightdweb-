var cacheName = 'eightd';
var filesToCache = [
  '/assets/images/index.jpg',
  '/assets/campusdm/1.jpg',
  '/assets/campusdm/2.jpg',
  '/assets/campusdm/3.jpg',
   '/assets/images/background1.jpg',
    '/assets/images/background2.jpg',
     '/assets/images/background3.jpg',
       '/assets/images/slide0.jpeg',
       '/assets/images/slide1.jpg',
       '/assets/images/slide2.jpg',
       '/assets/images/slide3.jpg',
  '/index.html'

];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        console.log('[ServiceWorker] Removing old cache', key);
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
