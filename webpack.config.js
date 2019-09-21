const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('@babel/polyfill');
const DotEnv = require('dotenv-webpack');
const {
    HotModuleReplacementPlugin
} = require('webpack');

module.exports = {
    entry: ["@babel/polyfill", path.join(__dirname, '/main.js')],
    output: {
        path: path.join(__dirname, '/bundle'),
        filename: 'index_bundle.js'
    },
    mode: 'development',

    devServer: {
        inline: true,
        port: 1995,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: path.join(__dirname, '/images/wallet-upload-png.ico')
        }),
       new HotModuleReplacementPlugin(),
       new DotEnv()
    ]
}