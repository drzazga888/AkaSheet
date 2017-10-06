const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('API calls will point to', process.env.SERVER_PATH || '/');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('../public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          { loader: 'file-loader?name=images/[name].[ext]' }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          { loader: 'file-loader?name=fonts/[name].[ext]' }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVER_PATH: JSON.stringify(process.env.SERVER_PATH)
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  devServer: {
    historyApiFallback: {
      index: '/'
    }
  }
}