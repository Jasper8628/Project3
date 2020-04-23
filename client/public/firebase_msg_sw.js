importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyCaZavTBWx55HG-hFNY6Nfz9wcM_IMQkIo",
  authDomain: "project3-6c48c.firebaseapp.com",
  databaseURL: "https://project3-6c48c.firebaseio.com",
  projectId: "project3-6c48c",
  storageBucket: "project3-6c48c.appspot.com",
  messagingSenderId: "945894585584",
  appId: "1:945894585584:web:f3d495b98ead98d65cbe35",
  measurementId: "G-HR2CPH7XBB"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function(event) {
  console.log("notification clicked");
});