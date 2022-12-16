const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    // чистит папку output при сборке
    clean: true,
  },
  resolve: {
    // какие расширения понимать по-умолчанию, чтобы не писать в import
    extensions: ['.js', '.json', '.png'],
    // алиасы в import
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  optimization: {
    // разбить output на чанки
    splitChunks: {
      chunks: 'all',
    },
  },
  target: 'web',
  devServer: {
    // включить hot reload
    hot: true,
    static: {
      directory: path.join(__dirname, 'src'),
    },
  },
  resolve: {
    // какие расширения понимать по-умолчанию, чтобы не писать в import
    extensions: ['.js', '.json', '.png'],
    // алиасы в import
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  optimization: {
    // разбить output на чанки
    splitChunks: {
      chunks: 'all',
    },
  },
  target: 'web',
  devServer: {
    // включить hot reload
    hot: true,
    static: {
      directory: path.join(__dirname, 'src'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      // шаблон для html, скрипты webpack подключит сам
      template: './index.html',
    }),
    //копирует файлы из src в dist
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
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
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      {
        test: /\.csv$/,
        use: ['csv-loader'],
      },
    ],
  },
};
