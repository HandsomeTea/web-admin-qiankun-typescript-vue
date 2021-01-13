/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    stats: 'minimal',
    output: {
        filename: 'javascript/[name].js'
    },
    performance: {
        hints: 'warning'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].css',
            chunkFilename: 'style/[id].css',
            ignoreOrder: false
        })
    ],
    optimization: {
        namedModules: true,
        minimize: false
    },
    module: {
        rules: [{
            test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|ico|pub)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    esModule: false,
                    outputPath: 'images',
                    publicPath: '../images',
                    name: '[name].[ext]'
                }
            }]
        }, {
            test: /\.(css|less)$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: path.resolve(__dirname, '../dist')
                }
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        strictMath: true,
                        noIeCompat: true
                    }
                }
            }, {
                loader: 'style-resources-loader',
                options: {
                    patterns: [path.resolve(__dirname, '../src/assets/css/global-var.less')]
                }
            }]
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        compress: true,
        port: 9003,
        host: 'localhost', //'0.0.0.0',
        index: 'index.html',
        headers: {},
        open: true,
        overlay: true, //编译运行时的错误直接显示在浏览器
        proxy: [{
            context: ['/api'],
            target: 'http://localhost:8088',
            secure: false
        }]
    }
});
