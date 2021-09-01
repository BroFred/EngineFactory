const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const common = require('./webpack.common.js');
const style = require('./webpack.style.js');

module.exports = merge(common,
  style.extractCSS({
    use: 'css-loader',
  }),
  {
    mode: 'production',
    plugins: [new CompressionPlugin()],
    optimization: {
      minimize: true,
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2015',
          css: true,
        }),
      ],
    },
  });
