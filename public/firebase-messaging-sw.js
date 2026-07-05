importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBQSlG7TQLxw4kgTTx-cdOh6DevlDzi9tc",
  authDomain: "wallet-tracker-b2a52.firebaseapp.com",
  projectId: "wallet-tracker-b2a52",
  storageBucket: "wallet-tracker-b2a52.firebasestorage.app",
  messagingSenderId: "705933406404",
  appId: "1:705933406404:web:6cc16aa5b15b95b0349991",
  measurementId: "G-V97GYB9V9T",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.data?.title;
  const notificationOptions = {
    body: payload.data?.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
