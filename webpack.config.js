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
    // шпблон именования полученных файлов
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
};
