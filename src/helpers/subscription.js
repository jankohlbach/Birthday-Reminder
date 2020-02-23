/* eslint-disable no-console */
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/firestore';
import 'firebase/firebase-auth';
import {
  FIREBASE_CONFIG,
  LOCALSTORAGE_KEY,
  PUBLIC_VAPID_KEY,
  FIREBASE_COLLECTION,
} from '../constants/firebase-config';

const app = firebase.initializeApp(FIREBASE_CONFIG);
const db = app.firestore();

const messaging = firebase.messaging();
messaging.usePublicVapidKey(PUBLIC_VAPID_KEY);

const changePushStatus = (status) => {
  const subscriptionButton = document.querySelector('header button');
  subscriptionButton.dataset.checked = status;
};

const setTokenSentToServer = (sent) => { window.localStorage.setItem(LOCALSTORAGE_KEY, sent ? '1' : '0'); };
const isTokenSentToServer = () => window.localStorage.getItem(LOCALSTORAGE_KEY) === '1';

const sendTokenToServer = (token) => {
  console.log(token);
  if (!isTokenSentToServer()) {
    db.collection(FIREBASE_COLLECTION).doc(token).set({ token })
      .then(() => {
        console.log('written to firestore');
        setTokenSentToServer(true);
        changePushStatus(true);
      })
      .catch((e) => {
        console.error('error writing to firestore', e);
        changePushStatus(false);
      });
  } else {
    console.info('Token already sent to server, won\'t send again unless it changes.');
    changePushStatus(true);
  }
};

messaging.onTokenRefresh(() => {
  messaging.getToken()
    .then((refreshedToken) => {
      console.log('Token refreshed.');
      setTokenSentToServer(false);
      sendTokenToServer(refreshedToken);
    })
    .catch((e) => {
      console.error('Unable to retrieve refreshed token.', e);
    });
});

const getToken = () => {
  messaging.getToken()
    .then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
      } else {
        setTokenSentToServer(false);
        // eslint-disable-next-line no-alert
        alert('Please allow notifications first');
      }
    })
    .catch((e) => {
      console.error('Error while retrieving token.', e);
      setTokenSentToServer(false);
    });
};

const deleteToken = () => {
  messaging.getToken()
    .then((currentToken) => {
      messaging.deleteToken(currentToken)
        .then(() => {
          console.log('token deleted');
          db.collection(FIREBASE_COLLECTION).doc(currentToken).delete()
            .then(() => {
              console.log('deleted from firestore');
              setTokenSentToServer(false);
              changePushStatus(false);
            })
            .catch((e) => {
              console.error('error deleting from firestore', e);
            });
        })
        .catch((e) => {
          console.error('Unable to delete token.', e);
        });
    })
    .catch((e) => {
      console.error('Error while retrieving token.', e);
    });
};

export const requestPermission = () => {
  if (!('PushManager' in window)) {
    console.log('push not available');
    changePushStatus(false);
    return;
  }

  app.auth().signInAnonymously()
    .catch((e) => {
      console.error('Error on signing in anonymously.', e);
    });


  Notification.requestPermission()
    .then((permission) => {
      if (permission === 'granted') {
        console.log('notification permission granted');
        getToken();
      } else {
        console.log('notification permission denied');
        changePushStatus(false);
      }
    });
};

export const subscribePush = () => {
  console.log('subscribing');
  getToken();
};

export const unsubscribePush = () => {
  console.log('unsubscribing');
  deleteToken();
};
