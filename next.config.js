/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withTM = require('next-transpile-modules')([
  '@nivo/core',
  '@nivo/line',
  'd3-interpolate',
]);
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins(
  [
    withTM,
    withImages,
    withFonts,
  ],
  {
    reactStrictMode: true,

    webpack(config) {
      // Agregamos soporte para SVGs
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'file-loader'],
      });
      return config;
    },

    // Ignorar errores de compilación de TypeScript durante el build
    typescript: {
      ignoreBuildErrors: true,
    },
  }
);