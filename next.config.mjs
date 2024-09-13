/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
// import withImages from 'next-images';
// import withTM from 'next-transpile-modules';

// const withTMConfig = withTM([
//   '@nivo/core',
//   '@nivo/bar',
//   '@nivo/line',
//   'd3-interpolate',
// ]);


const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack', 'file-loader'],
    });
    return config;
  },
}
 
export default nextConfig