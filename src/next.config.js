require("dotenv").config();
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const path = require("path");
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  distDir: "../.next",
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles/global")],
  },
};

module.exports = withPlugins(
  [
    withPWA({
      pwa: {
        dest: "../",
        // disable: !isProd,
      },
    }),
  ],
  nextConfig
);
