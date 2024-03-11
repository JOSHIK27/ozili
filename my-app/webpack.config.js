const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  // Your existing webpack configuration...

  plugins: [
    // Other plugins...
    new BundleAnalyzerPlugin(),
  ],
};
