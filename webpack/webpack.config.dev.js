const Path = require('path')
const Webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    inline: true
  },
   //plugins: [ //Có thể tắt khi cần thiết
    // new Webpack.DefinePlugin({ //Có thể tắt khi cần thiết
       //'process.env.NODE_ENV': JSON.stringify('development') //Có thể tắt khi cần thiết
    // }) //Có thể tắt khi cần thiết
  // ], //Có thể tắt khi cần thiết
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
      }
    ]
  }
})
