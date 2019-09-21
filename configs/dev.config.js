const merge = require('webpack-merge');
const {
   HotModuleReplacementPlugin
} = require('webpack');
const common = require('../webpack.config');


module.exports = merge(common, {
   devServer: {
      hot: true,
      open: true,
      historyApiFallback: true,
      port: 3001
   },
   mode: 'development',
   devtool: 'inline-source-map',
   module: {
      rules: [{
         test: /\.(sass|scss)$/,
         use: ['style-loader', 'css-loader', 'sass-loader']
      }]
   },
   plugins: [
      new HotModuleReplacementPlugin(),

   ]
})