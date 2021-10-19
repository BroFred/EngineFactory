const hq = require('alias-hq');

const alias = hq.get('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const pjson = require('../package.json');
const deps = pjson.dependencies;

const path = require('path');

const PATHS = {
  local: path.join(__dirname, '../'),
  app: path.join(__dirname, '../src'),
  packages: path.join(__dirname, '../../'),
  root: path.join(__dirname, '../'), // the root folder of the project, not current package
};

module.exports = {
  entry: path.resolve(PATHS.local, './main/bootstrap.ts'),
  output: {
    publicPath: 'auto',
    path: path.resolve(PATHS.local, 'build'),
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.tsx', '.ts'],
    modules: [path.resolve(PATHS.root, 'node_modules')],
    alias,
    fallback: {
      assert: false,
      buffer: require.resolve('buffer'),
    },
  },
  module: {
    rules: [
      { test: /\.worker\.ts$/, loader: 'worker-loader' },
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
      jsExtension: ".gz",
      template: path.join(__dirname, '../index.html'),
    }),
    new ModuleFederationPlugin({
      name: 'Platform',
      filename: 'remoteEntry.js',
      //if all federated Comp use the same copy of jotai, state will be shared  within App(Platform/State)
      remotes: {
        'Platform': 'Platform@/remoteEntry.js',
      },
      exposes: {
        './state': "@main/jotai",
        './connection': "@main/connection",
        './commonWorker': "@example/test.worker"
      },
      shared: {
        ...deps,
        jotai: {
          singleton: true,
          requiredVersion: deps.jotai,
        },
        "jotai/utils":{
          singleton: true,
          requiredVersion: deps.jotai,
        },
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    })
  ]
};
