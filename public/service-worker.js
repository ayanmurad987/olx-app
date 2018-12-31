

var dataCacheName = 'Ayan-olx-data-01.1';
var cacheName = 'Ayan-olx-01.1';
var filesToCache = [
  '/',
  '/index.html',
  '/img/olx-logo.png',
  '/img/acnt.png',
  '/img/option.png',
  '/img/msg.png',
  '/img/fvt.png',
  '/img/qr.png',
  '/img/al.png',
  '/next/app.js',
  '/style/main.css',
  '/style/login.css',
  '/style/menu.css',
  '/style/showadd.css',
  '/style/add.css',
  '/next/add.html',
  
  '/next/login.html'
  
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      cache.addAll([
        '/next/addshow.html' 
      ]);
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  return self.clients.claim();
});


self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
