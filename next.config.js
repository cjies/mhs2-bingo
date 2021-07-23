const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
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
};
