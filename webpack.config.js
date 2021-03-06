/* eslint-disable no-path-concat, prefer-template */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  watch: true,

  target: 'electron-renderer',

  entry: './app/src/renderer_process.js',

  output: {
    path: __dirname + '/app/build',
    publicPath: 'build/',
    filename: 'bundle.js'
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      $dirname: '__dirname'
    })
  ],

  resolve: {
    extensions: ['.js', '.json']
  }
}
