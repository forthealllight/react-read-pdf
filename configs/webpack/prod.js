// production config
process.env.NODE_ENV = 'production';
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
  plugins: [],
  externals: {
       'react': 'react',
       'react-dom': 'react-dom'
   }
});
