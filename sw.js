const CACHE_NAME = 'atomic-habit-v21';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // 清除舊版本的快取，確保載入最新版
          if (cacheName !== CACHE_NAME) {
            console.log('清除舊快取:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // 網路優先，失敗時才讀取快取 (確保有網路時總能抓到最新進度)
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
