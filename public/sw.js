// sw.js - Service Worker untuk cache busting

const CACHE_NAME = 'sadanten-v2-' + Date.now(); // Versi dengan timestamp untuk force update
const urlsToCache = [
  // Hanya cache file penting, halaman bisa di-fetch fresh
  '/manifest.json',
  // Tambahkan file statis penting lainnya jika perlu
];

// Event install - cache file statis
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
  );
  // Install segera tanpa menunggu
  self.skipWaiting();
});

// Event fetch - atur strategi cache
self.addEventListener('fetch', (event) => {
  // Jangan cache permintaan API
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Jika permintaan ke API sukses, tidak cache
          return response;
        })
        .catch(() => {
          // Jika fetch gagal, bisa kembalikan response kosong atau fallback
          return new Response('API Error', { status: 500 });
        })
    );
    return;
  }

  // Jangan cache halaman HTML - selalu fetch fresh
  if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
    );
    return;
  }

  // Untuk file statis (CSS, JS, gambar), gunakan strategi network-first
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Jika fetch sukses, simpan ke cache
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // Jika fetch gagal, coba dari cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Jika tidak ada di cache, kembalikan error
            return new Response('Network Error', { status: 500 });
          });
      })
  );
});

// Event activate - bersihkan cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Claim semua client
  self.clients.claim();
});