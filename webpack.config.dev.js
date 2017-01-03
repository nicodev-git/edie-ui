const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const precss = require('precss')

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'BACKEND_URL': JSON.stringify(process.env.BACKEND_URL || 'http://localhost:8080/')
      }
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, 'src')
        ]
      }
    ],
    loaders: [
      {
        loaders: ['babel-loader'],
        include: [
          path.resolve(__dirname, 'src')
        ],
        test: /\.js$/,
        plugins: ['transform-runtime', 'transform-decorators-legacy']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=32768'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.styl$/,
        include: path.join(__dirname, 'src'),
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss]
  }
}
