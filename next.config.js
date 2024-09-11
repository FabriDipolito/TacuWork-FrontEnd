/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const withFonts = require("next-fonts");
const withImages = require('next-images');

const withTM = require('next-transpile-modules')([
  '@nivo/core',
  '@nivo/line', 
  //'d3-interpolate',
]);

const withPlugins = require("next-compose-plugins");

module.exports = withTM({
  reactStrictMode: true,
});

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

module.exports = {
  typescript: {
    // Ignora los errores de compilación en el build
    ignoreBuildErrors: true,
  },
};