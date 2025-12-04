const CACHE_NAME = 'informe-pwa-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
  // Si tienes logo u otros archivos, añádelos aquí, ej: '/logo_realtech.png'
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => {
      if(k !== CACHE_NAME) return caches.delete(k);
    })))
  );
  self.clients.claim();
});

self.addEventListener('fetch', ev => {
  // Strategy: cache first for app shell, fallback to network
  ev.respondWith(
    caches.match(ev.request).then(resp => resp || fetch(ev.request))
  );
});
