const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const projectConfig = require('./project.config.json');
const packageJson = require("../package.json");

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: `/${projectConfig.name}/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: projectConfig.name,
      filename: 'remoteEntry.js',
      exposes: projectConfig.exposes,
      remotes: projectConfig.remotesProd,
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);