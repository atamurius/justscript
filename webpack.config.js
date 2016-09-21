var path = require('path');
var et = require('extract-text-webpack-plugin');

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
      include: [ path.resolve(__dirname, 'src') ],
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react'],
      }
    },{
      test: /\.scss$/,
      loader: et.extract('style-loader', 'css-loader!sass-loader?sourceMap'),
      include: [ path.resolve(__dirname, 'src') ],
    }]
  },
  plugins: [
    new et('style.css', {
      allChunks: true
    })
  ],
  resolve: {
    extensions: ['','.js','.jsx']
  },
  devServer: {
    progress: true,
    inline: true,
    colors: true,
    watch: true,
    historyApiFallback: true,
  }
};
