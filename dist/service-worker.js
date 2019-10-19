/* eslint-disable no-restricted-globals */
// update this name every time a cached file changes
// the new service-worker will be installed and activated
const appCache = 'app-cache-v5';
const urlsToCache = [
  './',
  './index.html',
  './favicon.ico',
  './res/styles/main.min.css',
  './res/scripts/main.min.js',
  './res/img/icon-chevron-down.svg',
  './res/img/icon-edit.svg',
  './res/img/icon-delete.svg',
];

// install event
// cache all needed files/assets
self.addEventListener('install', (e) => {
  // eslint-disable-next-line no-console
  console.log('Installing service-worker');

  e.waitUntil(
    caches.open(appCache)
      .then(cache => cache.addAll(urlsToCache)),
  );

  self.skipWaiting();
});

// activate event
// clear old caches
self.addEventListener('activate', (e) => {
  // eslint-disable-next-line no-console
  console.log('Activate service-worker');

  e.waitUntil(
    caches.keys()
      .then(keyList => Promise
        .all(keyList
          .map((key) => {
            if (key !== appCache) {
              // eslint-disable-next-line no-console
              console.log('Removing old cache', key);
              return caches.delete(key);
            }
            return 1;
          }))),
  );
});

// fetch event
// handle requests
self.addEventListener('fetch', (e) => {
  // offline-first
  e.respondWith(
    caches.match(e.request)
      .then((response) => {
        if (response) {
          // retrieve from cache
          return response;
        }
        // fetch normal
        return fetch(e.request);
      }),
  );
});
