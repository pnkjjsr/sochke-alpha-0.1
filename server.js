const express = require("express");
const { parse } = require("url");
const { join } = require("path");
const { https } = require("firebase-functions");
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
    if (pathname === "/service-worker.js") {
      const filePath = join(__dirname, ".next/static", pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  if (isDev) {
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${port}`);
    });
  }
});

exports.nextApp = https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});
