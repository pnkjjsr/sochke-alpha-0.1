import contenfulConfig from "@configs/contenfulConfig.json";
const { createClient } = require("contentful");

const defaultConfig = {
  SPACE: contenfulConfig.CONTENTFUL_SPACE_ID,
  DELIVERY_TOKEN: contenfulConfig.CONTENTFUL_ACCESS_TOKEN,
  PREVIEW_TOKEN: contenfulConfig.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
};

const isProduction = process.env.NODE_ENV === "production";

const contentfulClient = createClient({
  host: isProduction ? "cdn.contentful.com" : "preview.contentful.com",
  accessToken: isProduction
    ? defaultConfig.DELIVERY_TOKEN
    : defaultConfig.PREVIEW_TOKEN,
  space: defaultConfig.SPACE,
});

module.exports = { contentfulClient };
