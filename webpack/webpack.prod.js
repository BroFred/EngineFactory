const { merge } = require('webpack-merge');
const CompressionPlugin = require("compression-webpack-plugin");

const common = require('./webpack.common.js');
const style = require('./webpack.style.js');

module.exports = merge(common,
  style.extractCSS({
    use: "css-loader",
  }),
  {
    mode: 'production',
    plugins: [new CompressionPlugin()]
  });
