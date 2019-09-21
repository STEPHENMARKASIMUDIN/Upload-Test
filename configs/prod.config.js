const merge = require('webpack-merge');
const common = require('../webpack.config');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');


module.exports = merge(common, {
   mode: 'production',
   devtool: 'source-map',
   optimization: {
      minimizer: [
         new UglifyJSWebpackPlugin({
            extractComments: true,
            uglifyOptions: {
               compress: true,
            },
            parallel: true,
         })
      ]
   },
   module: {
      rules: [{
         test: /\.(sass|scss)$/,
         use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
         ]
      }]
   },
   plugins: [
      new OptimizeCssAssetsWebpackPlugin(),
      new MiniCssExtractPlugin({
         filename: '[name].css'
      })
   ]
})
