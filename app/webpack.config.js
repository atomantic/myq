// const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './client/js/index.js',

  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'build.js'
  },

  devtool: 'source-map',

  resolve: {
    modules: ['client/lib', 'node_modules'],
    extensions: ['.js']
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  }
};
