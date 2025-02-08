const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
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
  optimization: {
    minimizer: [
      "...", // Использование стандартных минимизаторов Webpack
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
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
