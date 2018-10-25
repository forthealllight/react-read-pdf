process.env.NODE_ENV = 'lib';
const path = require('path');
const config = {
  mode:'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: {
    index: ['babel-polyfill',
      path.resolve(__dirname, '../../src/index.tsx')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../../lib'),
    library: 'test',
    libraryTarget: 'umd',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["env", "stage-2"],
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.(css|less|scss)$/,
        use: [
              require.resolve("style-loader"),
              {
                loader: "typings-for-css-modules-loader",
                options: {
                  namedexport: true,
                  camelcase: true,
                  modules: true
                }
              },
              {
                loader: require.resolve("less-loader") // compiles Less to CSS
              }
          ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ],
  },
}
module.exports = config;
