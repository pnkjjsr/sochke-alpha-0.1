const express = require("express");
const { parse } = require("url");
const { join } = require("path");
const { https } = require("firebase-functions");
const functions = require("firebase-functions");

const { default: next } = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const isDev = process.env.NODE_ENV !== "production";
const appDir = join("src", require("./src/next.config.js").distDir);

const app = next({
  dev: isDev,
  conf: {
    distDir: appDir,
  },
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // handle GET request to /service-worker.js
    if (pathname === "/sw.js" || pathname.startsWith('/workbox-')) {
      const filePath = join(__dirname, ".next", pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  const serviceWorkers = [
    {
      filename: "sw.js",
      path: "./static/sw.js",
    },
    {
      filename: "firebase-messaging-sw.js",
      path: "./static/firebase-messaging-sw.js",
    },
  ];

  serviceWorkers.forEach(({ filename, path }) => {
    server.get(`/${filename}`, (req, res) => {
      app.serveStatic(req, res, path);
    });
  });

  if (isDev) {
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
});

exports.website = https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});

// exports.sendEmail = functions.pubsub
//   .schedule("every 1 minutes")
//   .onRun((context) => {
//     console.log("This will be run every 1 minutes!");
//     return null;
//   });

// exports.testEmail = https.onRequest((req, res) => {
//   const { sendEmail } = require("./server/libs/mailChimp");
//   sendEmail();
//   return res.json("done");
// });
