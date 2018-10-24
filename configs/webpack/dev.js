// development config
process.env.NODE_ENV = 'development';
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');
const path = require('path');
module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    './app.tsx' // the entry point of our app
  ],
  devServer: {
    hot: true, // enable HMR on the server
    contentBase:path.resolve('public'),
    publicPath:'/',
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
});
