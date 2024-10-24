const path = require('path')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const dotenvFilename = isProduction ? '.env.production' : '.env.development';

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      }
    ],
  },
  plugins: [
    new Dotenv({ path: path.resolve(__dirname, '../' + dotenvFilename) }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      //     <!--
      //       manifest.json provides metadata used when your web app is installed on a
      //       user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
      //     -->
      manifest: './public/manifest.json',
      meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
        'theme-color': '#000000',
      },
      links: [
        {
          rel: 'apple-touch-icon',
          href: './public/apple-touch-icon.png',
        },
      ],
    }),
  ],
};
