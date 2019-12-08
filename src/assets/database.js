const CACHE_STORAGE_KEY = 'data-cache';

const initDB = () => {
  if (!('indexedDB' in window)) {
    // eslint-disable-next-line no-console
    console.log('This browser does not support IndexedDB');
    return;
  }

  const dbRequest = indexedDB.open(CACHE_STORAGE_KEY, 1);

  dbRequest.onupgradeneeded = () => {
    const db = dbRequest.result;

    if (!db.objectStoreNames.contains('events')) {
      const eventOS = db.createObjectStore('events', { keyPath: 'hash' });

      eventOS.createIndex('day', 'day', { unique: false });
      eventOS.createIndex('month', 'month', { unique: false });
      eventOS.createIndex('year', 'year', { unique: false });
      eventOS.createIndex('name', 'name', { unique: false });
      eventOS.createIndex('info', 'info', { unique: false });
    }
  };
};

const addToCache = (event) => {
  const dbRequest = indexedDB.open(CACHE_STORAGE_KEY);

  dbRequest.onsuccess = () => {
    const db = dbRequest.result;
    const transaction = db.transaction('events', 'readwrite');
    const objectStore = transaction.objectStore('events');

    objectStore.put(event);
  };
};

const removeFromCache = (hash) => {
  const dbRequest = indexedDB.open(CACHE_STORAGE_KEY);

  dbRequest.onsuccess = () => {
    const db = dbRequest.result;
    const transaction = db.transaction('events', 'readwrite');
    const objectStore = transaction.objectStore('events');

    objectStore.delete(hash);
  };
};

export { initDB, addToCache, removeFromCache };
