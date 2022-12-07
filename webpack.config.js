const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // пути до точек входа
    main: './src/index.js',
    analytics: './src/analytics.js',
  },
  output: {
    // шпблон именования полученных файлов
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      // шаблон для html, скрипты webpack подключит сам
      template: './src/index.html',
    }),
    // чистит папку dist при сборке
    new CleanWebpackPlugin(),
  ],
};
