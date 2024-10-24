const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const name = commonConfig.moduleConfig.name;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: `/${name}/latest/`,
  }
};

module.exports = merge(commonConfig.webpackConfig, prodConfig);