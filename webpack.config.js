const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

// пример написания функции
// отдает шаблон для имени файла
const fileName = (extension) =>
  isProd ? `[name].[contenthash].${extension}` : `[name].${extension}`;

const cssLoaders = (extraLoaders = []) =>
  // webpack пропускает лоадеры справа налево
  // css-loader транспилирует CSS в CommonJS - позволяет делать imports css in js
  // MiniCssExtractPlugin.loader выносит css в отдельный файл
  [MiniCssExtractPlugin.loader, 'css-loader', ...extraLoaders];

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
    filename: fileName('js'),
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
    // разбивает output на чанки
    splitChunks: {
      chunks: 'all',
    },
    // минимизация JS c помощью плагина Terser
    // минимизация CSS c помощью плагина CssMinimizerPlugin
    // минимизация по-умолчанию в webpack работает только для prod
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  target: 'web',
  devServer: {
    // включает hot reload
    hot: true,
    static: {
      directory: path.join(__dirname, 'src'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      // шаблон для html, скрипты webpack подключит сам
      template: './index.html',
      minify: {
        // минимизирует html при prod сборке
        collapseWhitespace: isProd,
      },
    }),
    // копирует файлы из src в dist
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    // выносит css в отдельный файл
    // Hot Module Reloading HMR для CSS автоматически поддерживается в webpack 5.
    new MiniCssExtractPlugin({ filename: fileName('css') }),
  ],
  // лоадеры позволяют webpack работать с файлами, отличными от js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.less$/,
        use: cssLoaders(['less-loader']),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders(['sass-loader']),
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
