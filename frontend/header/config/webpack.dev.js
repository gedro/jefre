const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const port = commonConfig.moduleConfig.devServerPort;

const devConfig = {
  mode: 'development',
  output: {
    publicPath: `http://localhost:${port}/`,
  },
  devServer: {
    port: port,
    historyApiFallback: {
      index: '/index.html',
    },
  }
};

module.exports = merge(commonConfig.webpackConfig, devConfig);
