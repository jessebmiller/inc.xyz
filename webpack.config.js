var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin")

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/client/index.html",
  filename: "./index.html"
})

module.exports = {
  entry: ["babel-polyfill", "./src/client/index.js"],
  output: {
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /server/],
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: "[name]_[local]_[hash:base64]",
            sourceMap: true,
            minimize: true
          }
        }]
      }
    ]
  },
  plugins: [htmlPlugin]
}
