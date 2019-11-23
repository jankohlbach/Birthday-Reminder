function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // navigator.serviceWorker.register('/dist/service-worker.js')
      navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          // eslint-disable-next-line no-console
          console.log('Successfully registered service worker', reg);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error('Error whilst registering service worker', err);
        });
    });
  }
}

function unregister() {
  console.log('test');
}

export { register, unregister };
