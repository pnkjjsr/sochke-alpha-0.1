const { createClient } = require("contentful");

const defaultConfig = {
  SPACE: process.env.CONTENTFUL_SPACE_ID,
  DELIVERY_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
};

const isProduction = process.env.NODE_ENV === "production";

const contentfulClient = createClient({
  host: isProduction ? "cdn.contentful.com" : "preview.contentful.com",
  accessToken: isProduction
    ? defaultConfig.DELIVERY_TOKEN
    : defaultConfig.PREVIEW_TOKEN,
  space: defaultConfig.SPACE,
});

const getEntry = (entryId) => {
  return contentfulClient.getEntry(entryId, { include: 2 });
};

module.exports = { contentfulClient, getEntry };
