var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/stores/__tests/entitystore.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'test-bundle.js',
    libraryTarget: 'commonjs',
    publicPath: '/static/'
  },
  externals: {
      fs: "fs"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
