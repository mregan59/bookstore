

const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, './public/index.html'),
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
  entry: path.join(__dirname, '/app/app.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  resolve: {
    extensions: ['.web.js', '.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
      '@storybook/react-native': '@storybook/react',
      'styled-components/native': 'styled-components',
      'reactotron-react-native': 'reactotron-react-js',
      'lottie-react-native': 'react-native-web-lottie',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules\/(?!()\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.(ts|js)x?$/,
        include: /node_modules/,
        exclude: [/react-native-web/, /\.(native|ios|android)\.(ts|js)x?$/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /@?(ui-kitten|eva-design|moti|react-native-reanimated).*\.(ts|js)x?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-proposal-class-properties',
            'react-native-reanimated/plugin',
          ],
        },
      },
    ],
  },
  plugins: [
      HTMLWebpackPluginConfig,
    ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
}
