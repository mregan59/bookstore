const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components', 'moti']
        }
    }, argv);
    config.resolve.alias = {
        'react-native': 'react-native-web',
        'react-native-svg': 'react-native-svg-web',
        '@storybook/react-native': '@storybook/react',
        'styled-components/native': 'styled-components',
        'reactotron-react-native': 'reactotron-react-js',
        'lottie-react-native': 'react-native-web-lottie',
    }
    return config;
};

// const path = require('path')
// const HTMLWebpackPlugin = require('html-webpack-plugin')

// const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
//   template: path.resolve(__dirname, './public/index.html'),
//   filename: 'index.html',
//   inject: 'body',
// })

// module.exports = {
//   entry: path.join(__dirname, 'App.js'),
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, '/build'),
//   },
//   resolve: {
//     extensions: ['.web.js', '.js', '.jsx', '.json', '.ts', '.tsx'],
//     alias: {
//       'react-native': 'react-native-web',
//       'react-native-svg': 'react-native-svg-web',
//       '@storybook/react-native': '@storybook/react',
//       'styled-components/native': 'styled-components',
//       'reactotron-react-native': 'reactotron-react-js',
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(ts|js)x?$/,
//         exclude: /node_modules\/(?!()\/).*/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
//             plugins: [
//               ['@babel/plugin-proposal-decorators', { legacy: true }],
//               '@babel/plugin-proposal-class-properties',
//               'react-native-reanimated/plugin',
//             ],
//           },
//         },
//       },
//       {
//         test: /\.(ts|js)x?$/,
//         include: /node_modules/,
//         exclude: [/react-native-web/, /\.(native|ios|android)\.(ts|js)x?$/],
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
//             plugins: [
//               ['@babel/plugin-proposal-decorators', { legacy: true }],
//               '@babel/plugin-proposal-class-properties',
//               'react-native-reanimated/plugin',
//             ],
//           },
//         },
//       },
//       {
//         test: /@?(ui-kitten|eva-design|react-native-gesture-handler|moti|react-native-reanimated).*\.(ts|js)x?$/,
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
//           plugins: [
//             ['@babel/plugin-proposal-decorators', { legacy: true }],
//             '@babel/plugin-proposal-class-properties',
//             'react-native-reanimated/plugin',
//           ],
//         },
//       },
//     ],
//   },
//   plugins: [HTMLWebpackPluginConfig],
//   devServer: {
//     historyApiFallback: true,
//     contentBase: './',
//     hot: true,
//   },
// }
