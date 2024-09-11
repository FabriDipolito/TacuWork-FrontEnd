/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import withFonts from 'next-fonts';
import withImages from 'next-images';
import withTM from 'next-transpile-modules';

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