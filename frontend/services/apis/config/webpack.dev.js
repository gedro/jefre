const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const projectConfig = require('./project.config.json');
const packageJson = require("../package.json");

const devConfig = {
  mode: 'development',
  output: {
    publicPath: `http://localhost:${projectConfig.devServerPort}/`,
  },
  devServer: {
    port: projectConfig.devServerPort,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: projectConfig.name,
      filename: 'remoteEntry.js',
      exposes: projectConfig.exposes,
      remotes: projectConfig.remotesDev,
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
