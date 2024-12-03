const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const projectConfig = require('./project.config.json');
const packageJson = require("../package.json");

const remotes = projectConfig.remotesProd;

if(remotes) {
  const domain = process.env.PRODUCTION_DOMAIN;
  Object.keys(remotes).forEach(key => {
    eval("`" + remotes + "`")
    remotes[key] = eval("`" + remotes[key] + "`");
  });
}

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
      remotes: remotes,
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);