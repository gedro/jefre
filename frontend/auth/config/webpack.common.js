const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const name = 'auth';
const port = 9090;
const exposes = {
  './AuthApp': './src/bootstrap',
};

module.exports = {
  moduleConfig: {
    name: name,
    devServerPort: port
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            },
          },
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: name,
        filename: 'remoteEntry.js',
        exposes: exposes,
        shared: packageJson.dependencies,
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
    ],
  }
};