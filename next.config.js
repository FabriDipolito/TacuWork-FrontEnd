/* eslint-disable prettier/prettier */
const withFonts = require("next-fonts");
const withImages = require('next-images');

module.exports = withImages();

module.exports = withFonts({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack", "file-loader"],
    });
    return config;
  },
});