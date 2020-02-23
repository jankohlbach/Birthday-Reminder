/* eslint-disable no-restricted-globals */
self.addEventListener('push', () => {
  const date = new Date();
  const CURRENT_DAY = date.getDate();
  const CURRENT_MONTH = date.getMonth() + 1;
  const CURRENT_YEAR = date.getFullYear();

  const getCache = () => {
    const dbRequest = indexedDB.open('data-cache');

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const transaction = db.transaction('events', 'readonly');
      const objectStore = transaction.objectStore('events');

      const osRequest = objectStore.getAll();

      osRequest.onsuccess = () => {
        const entries = osRequest.result;

        entries.forEach((entry) => {
          if (
            parseInt(entry.day, 10) === CURRENT_DAY
            && parseInt(entry.month, 10) === CURRENT_MONTH
          ) {
            let years = '';
            if (entry.year) years = CURRENT_YEAR - entry.year;
            const data = {
              body: `Celebrate ${entry.name}${years !== '' ? `, ${years} years` : ''}`,
              icon: 'favicon/favicon-196x196.png',
            };
            self.registration.showNotification('🎉 TODAY', data);
          }
        });
      };
    };
  };

  getCache();
});
