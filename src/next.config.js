require("dotenv").config();
const runtimeCaching = require('next-pwa/cache')
const path = require("path");
const withPlugins = require('next-compose-plugins');
const pwa = require('next-pwa')
const less = require('@zeit/next-less')



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
};

// module.exports = withPlugins([
//   [less, {
//     cssModules: true
//   }],
//   [pwa, {
//     dest: '../public', /*service working in public folder if .next not working.*/
//     disable: process.env.NODE_ENV === 'development',
//     register: true, // on/off PWA feature.
//     runtimeCaching,
//   }]
// ], nextConfig);

module.exports = pwa(nextConfig)