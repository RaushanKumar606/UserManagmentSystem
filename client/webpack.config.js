const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // ... your other config
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};
