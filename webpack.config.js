const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const fs = require("fs");

// Функция для получения всех HTML-файлов из указанной директории
function getHtmlFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".html");
}

module.exports = {
  entry: "./development/index.js", // Главный JavaScript-файл
  output: {
    path: path.resolve(__dirname, "production"), // Папка для сборки
    filename: "index.js", // Имя итогового JS-файла
    publicPath: "/", // Устанавливает корневую директорию для всех файлов
  },
  module: {
    rules: [
      {
        test: /\.html$/, // Обработка HTML-файлов
        use: ["html-loader"],
      },
      {
        test: /\.scss$/i, // Обработка SCSS-файлов
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/, // Обработка JS-файлов
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, // Обработка изображений
        type: "asset",
      },
    ],
  },
  plugins: [
    // Генерация HTML-файлов для всех страниц из папки "pages"
    ...getHtmlFiles(path.resolve(__dirname, "development/pages")).map(
      (file) => {
        return new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "development/pages", file),
          filename: `pages/${file}`, // Сохранение в папке "pages"
        });
      }
    ),
    // Главная страница
    new HtmlWebpackPlugin({
      template: "./development/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", // Имя итогового CSS-файла
    }),
    new CleanWebpackPlugin(), // Очистка папки "production" перед сборкой
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "development/assets/image"),
          to: path.resolve(__dirname, "production/assets/image"),
        },
      ],
    }),
  //  new ESLintPlugin({ extensions: ["js"], // Укажите расширения файлов для проверки
  //   exclude: ["node_modules"], // Исключение папок
  //   fix: true,
  //   overrideConfigFile: path.resolve(__dirname, "eslint.config.mjs")}) // Автоматическое исправление ошибок)
  ],
  devServer: {
    port: 8080, // Порт для локального сервера
    open: true, // Автоматическое открытие браузера
    static: {
      directory: path.resolve(__dirname, "production"), // Обслуживание файлов из папки "production"
    },
    historyApiFallback: true, // Обслуживание HTML-файлов для SPA
  },
};
