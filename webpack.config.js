var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    client: './src/client/index.js',
  },
  output: {
    path: __dirname +'/target',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015','react']
      }
    }]
  },
  resolve: {
    extensions: ['','.js','.jsx']
  }
};
