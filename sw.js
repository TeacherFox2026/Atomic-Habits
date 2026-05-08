const CACHE_NAME = 'atomic-habit-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 滿足 PWA 條件的最低限度 Fetch 監聽器
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(() => {
    return new Response('目前處於離線狀態');
  }));
});
