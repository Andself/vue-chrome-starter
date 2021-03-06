const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const config = require('./config')
fs.copySync('static/', 'dist/')

module.exports = {
  entry: {
    popup: './src/popup/index.js',
    options: './src/options/index.js',
    background: './src/background/index.js',
    // vendor: config.vendor,
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../src'),
      components: path.join(__dirname, '../src/components')
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loaders: ['vue-loader']
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.popupTitle,
      template: __dirname + '/index.html',
      filename: 'popup.html',
      chunks: ['vendor', 'popup']
    }),
    new HtmlWebpackPlugin({
      title: config.optionsTitle,
      template: __dirname + '/index.html',
      filename: 'options.html',
      chunks: ['vendor', 'options']
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor.[chunkhash:8].js'
    // }),
    // new ProgressBarPlugin(),
  ]
}