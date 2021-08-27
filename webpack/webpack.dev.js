const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const style = require('./webpack.style.js');

module.exports = merge(
  common,
  style.loadCSS(),
  {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].js',
    }
  });
