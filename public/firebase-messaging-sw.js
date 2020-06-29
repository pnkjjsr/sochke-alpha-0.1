/* global importScripts, firebase */
importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "",
  projectId: "",
  messagingSenderId: "",
  appId: "",
});

firebase.messaging();
