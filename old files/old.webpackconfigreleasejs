var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/main/resources/static/scripts');
var APP_DIR = path.resolve(__dirname, 'web/src');

var config = {
  entry: APP_DIR + '/index.js',

  resolve: {
    root: [
      APP_DIR,
    ],
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: BUILD_DIR,
    filename: 'bundle.release.js'
  },

  module: {
    loaders: [
      { test: /\.jsx?/, loaders: ['babel'], include: APP_DIR },
      { test: /\.json$/, loader: 'json' },
      //{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.css$/, loaders: ['style', 'css'] }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.ExtendedAPIPlugin(),
  ]
};

module.exports = [config];