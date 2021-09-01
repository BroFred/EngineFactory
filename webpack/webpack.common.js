const hq = require('alias-hq');

const alias = hq.get('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const PATHS = {
  local: path.join(__dirname, '../'),
  app: path.join(__dirname, '../src'),
  packages: path.join(__dirname, '../../'),
  root: path.join(__dirname, '../'), // the root folder of the project, not current package
};

module.exports = {
  entry: path.resolve(PATHS.local, './main/index.jsx'),
  output: {
    publicPath: 'auto',
    path: path.resolve(PATHS.local, 'build'),
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.tsx', '.ts'],
    modules: [path.resolve(PATHS.root, 'node_modules')],
    alias,
    fallback: {
      assert: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx', // Remove this if you're not using JSX
          target: 'es2015', // Syntax to compile to (see options below for possible values)
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dashboard',
      template: path.join(__dirname, '../index.html'),
    })],
  devServer: {
    static: {
      directory: path.join(__dirname, '../index.html'),
    },
    host: process.env.HOST, // Defaults to `localhost` port: process.env.PORT, // Defaults to 8080
    open: true, // Open the page in browser
    port: process.env.PORT,
  },
};
