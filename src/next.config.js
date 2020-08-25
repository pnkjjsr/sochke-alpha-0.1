require("dotenv").config();

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const path = require("path");

const nextConfig = {
  distDir: "../.next",

  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles/global")],
  },

  pwa: {
    // dest: '../public', /*service working in public folder if .next not working.*/
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
  },
};

module.exports = withPWA(nextConfig)