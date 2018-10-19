// production config
const merge = require('webpack-merge');
const {resolve} = require('path');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  plugins: []
  // externals: {
  //      'react': 'react',//因为引入的肯定是react项目，所以不需要再将react打包进npm包
  //      'react-dom': 'react-dom'
  //  }
});
