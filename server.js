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
    return handle(req, res);
  });

  server.get("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    console.log(pathname);

    if (pathname === "/sw.js" || pathname.startsWith("/workbox-")) {
      const filePath = join(__dirname, ".next", pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  // server.listen(port, (err) => {
  //   if (err) throw err;
  //   console.log(`> Ready on http://localhost:${port}`);
  // });
});

exports.nextApp = https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});
