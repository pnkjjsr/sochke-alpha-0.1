require("dotenv").config();
const runtimeCaching = require('next-pwa/cache')
const path = require("path");
const pwa = require('next-pwa')

const nextConfig = {
  distDir: "../.next",

  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles/global")],
  },

  pwa: {
    dest: '../public', /*service working in public folder if .next not working.*/
    disable: process.env.NODE_ENV === 'development',
    register: true, // on/off PWA feature.
    runtimeCaching,
  },

  // webpack5: false,
};

module.exports = pwa(nextConfig)