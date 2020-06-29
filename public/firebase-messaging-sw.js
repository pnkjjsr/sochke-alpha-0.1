/* global importScripts, firebase */
importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCZM1B324riRuykR26WauuSfOF_wGmkoQA",
  projectId: "nextjs-contentful-firebase",
  messagingSenderId: "339091831749",
  appId: "1:339091831749:web:827fbe43a33fbcfd06a9ac",
});

firebase.messaging();
