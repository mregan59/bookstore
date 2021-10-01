const custom = require('./webpack.config')
const webpack = require('webpack')

module.exports = {
  stories: ['../app/components/**/*.stories.@(js|jsx|ts|tsx)'],
  core: {
      builder: 'webpack5'
  },
  webpackFinal: (config) => {
    const newConfig =  {
      ...config,
      resolve: {
        ...config.resolve,
        extensions: [ ...custom.resolve.extensions ],
        alias: { ...config.resolve.alias, ...custom.resolve.alias },
      },
      module: { ...config.module, rules: custom.module.rules },
    }
    newConfig.plugins.push(
        new webpack.DefinePlugin({
            '__DEV__': JSON.stringify(true)
        })
    );
    return newConfig;
  },
}
