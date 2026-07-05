import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const waitForServiceWorker = (registration) => {
  return new Promise((resolve, reject) => {
    if (registration.active) {
      resolve(registration);
    } else {
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "activated") {
            resolve(registration);
          }
        });
      });
      setTimeout(
        () => reject(new Error("Service Worker failed to activate")),
        5000
      );
    }
  });
};

const getOrRegisterServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    return navigator.serviceWorker
      .getRegistration("/firebase-push-notification-scope")
      .then((serviceWorker) => {
        if (serviceWorker) return waitForServiceWorker(serviceWorker);
        return navigator.serviceWorker
          .register("/firebase-messaging-sw.js", {
            scope: "/firebase-push-notification-scope",
          })
          .then(waitForServiceWorker);
      });
  }
  throw new Error("The browser doesn’t support service worker.");
};
const getFirebaseToken = () =>
  getOrRegisterServiceWorker().then((registration) =>
    getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
      serviceWorkerRegistration: registration,
    })
  );

export { messaging, getFirebaseToken, getOrRegisterServiceWorker, onMessage };
