/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withTM = require('next-transpile-modules');

const withTMConfig = withTM([
  '@nivo/core',
  '@nivo/bar',
  '@nivo/line',
  'd3-interpolate',
]);

module.exports = withTMConfig({
  reactStrictMode: true,
});

module.exports = withImages();

module.exports = withFonts({
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack", "file-loader"],
    });
    return config;
  },
});