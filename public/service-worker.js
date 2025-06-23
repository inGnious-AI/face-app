// Cache version to manage updates
const CACHE_NAME = 'my-pwa-cache-v1';

// List of assets to cache
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];


// Install event: Cache static assets
this.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching all assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event: Clean up old caches
this.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cache}`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return this.clients.claim(); // Ensure SW takes control of pages immediately
});

// Fetch event: Serve cached assets or fetch from the network
this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        console.log(`[Service Worker] Serving from cache: ${event.request.url}`);
        return cachedResponse;
      }
      console.log(`[Service Worker] Fetching: ${event.request.url}`);
      return fetch(event.request)
        .then(networkResponse => {
          // Optionally cache new network responses
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Fallback for failed requests (optional)
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html'); // Fallback to main page
          }
        });
    })
  );
});
