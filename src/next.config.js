require("dotenv").config();
const path = require("path");

const nextConfig = {
  distDir: "../.next",
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN:
      process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  },
  // webpack(config, { buildId, dev, isServer, defaultLoaders }) {
  //   // Alias
  //   config.resolve.alias["pages"] = path.join(__dirname, "pages");
  //   config.resolve.alias["public"] = path.join(__dirname, "public");
  //   config.resolve.alias["layouts"] = path.join(__dirname, "src/layouts");
  //   config.resolve.alias["libs"] = path.join(__dirname, "src/libs");
  //   config.resolve.alias["components"] = path.join(__dirname, "src/components");
  //   config.resolve.alias["utils"] = path.join(__dirname, "src/utils");
  //   config.resolve.alias["common"] = path.join(__dirname, "src/common");
  //   return config;
  // },
};

module.exports = nextConfig;
