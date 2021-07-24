const CopyPlugin = require('copy-webpack-plugin');
const withLess = require('next-with-less');

module.exports = withLess({
  reactStrictMode: true,

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
  // customize antdesign theme
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        'primary-color': '#381a02',
        'border-radius-base': '0.5rem',
      },
    },
  },
});
