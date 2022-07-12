const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: './src/App.js',
  output: {
    filename: 'App2.js',
    path: path.resolve(__dirname, 'dist', 'scripts'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { useBuiltIns: 'usage', corejs: { version: 3 } },
              ],
            ],
          },
        },
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new cleanPlugin.CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: path.join(__dirname,'dist/index.html'),
      template: '/index.html',
      chunks: ['/dist/scripts/App.js']
    })
  ],
};
