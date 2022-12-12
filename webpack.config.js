const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // корневая папка, где webpack будет искать файлы, все пути указывать от нее
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    // пути до точек входа (где начинается сборка)
    main: './index.js',
    analytics: './analytics.js',
  },
  output: {
    // шаблон именования полученных файлов
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      // шаблон для html, скрипты webpack подключит сам
      template: './index.html',
    }),
    // чистит папку dist при сборке
    new CleanWebpackPlugin(),
  ],
  // лоадеры позволяют webpack работать с файлами, отличными от js
  module: {
    rules: [
      {
        test: /\.css$/,
        // webpack пропускает справа налево: сначала css-loader, потом style-loader
        // css-loader позволяет делать imports css in js
        // style-loader добавляет стили в <head> html
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        // file-loader устарел https://webpack.js.org/guides/asset-modules/
        // заменен на type: 'asset/resource',
        // было use: ['file-loader'],
      },
    ],
  },
};
