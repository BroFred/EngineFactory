const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const style = require('./webpack.style.js');

const path = require('path');

module.exports = merge(
  common,
  style.loadCSS(),
  {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].js',
    },
    devServer: {
      static: {
        directory: path.join(__dirname, '../index.html'),
      },
      hot: false,
      host: process.env.HOST, // Defaults to `localhost` port: process.env.PORT, // Defaults to 8080
      open: true, // Open the page in browser
      port: '8081',
    },
  },
);
