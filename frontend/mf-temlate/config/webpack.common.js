const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const name = 'xxx';           //FIXME: replace XXX with the name of the project
const port = 908X;          //FIXME: replace X with the number of the port you are using
const exposes = {
  './XxxApp': './src/bootstrap',    //FIXME: replace XXX with the name of the exposed component
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