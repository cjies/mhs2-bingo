const CopyPlugin = require('copy-webpack-plugin');
const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
  webpack: function (config, { dev, isServer }) {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    // copy csv files on productions
    if (!dev) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [{ from: 'csv', to: 'csv' }],
        })
      );
    }

    return config;
  },
};

const plugins = [
  // customize antdesign theme
  [
    withLess,
    {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#381a02',
            'border-radius-base': '0.5rem',
            'font-size-base': '16px',
          },
        },
      },
    },
  ],
  // Analyze bundle
  [withBundleAnalyzer],
];

module.exports = withPlugins(plugins, nextConfig);
