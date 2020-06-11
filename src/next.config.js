require("dotenv").config();
const path = require("path");

const nextConfig = {
  distDir: "../.next",
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles/global")],
  },
};

module.exports = nextConfig;
