const Path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvFlow = require('dotenv-flow-webpack')
module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js')
  },
  output: {
    path: Path.join(__dirname, '../dist'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  devServer: {
    http2: true,
     //proxy: { //Có thể tắt khi cần thiết
       //'/x36xhzz': { //Có thể tắt khi cần thiết
        // target: 'https://test-streams.mux.dev', //Có thể tắt khi cần thiết
       // changeOrigin: true, // Nếu đích là một tên miền, thì thông số này là bắt buộc，//Có thể tắt khi cần thiết
       // secure: true // Thiết lập proxy hỗ trợ giao thức https //Có thể tắt khi cần thiết
     // } //Có thể tắt khi cần thiết
    // } //Có thể tắt khi cần thiết
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public'), to: 'public' }
    ]),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html')
    }),
    new DotenvFlow({
      node_env: process.env.NODE_ENV === 'production' ? 'production' : 'test'
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      { test: /\.hbs$/, loader: 'handlebars-loader' },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  }
}
