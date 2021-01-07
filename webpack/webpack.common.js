/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const vendorPackage = ['axios', 'dplayer', 'vue', 'vue-i18n', 'vue-router', 'vuex', 'element-ui'];
const catchPackagesGrouped = () => {
    const result = {};

    vendorPackage.map(package => {
        result[package] = {
            test: module => module.resource && /\.js$/.test(module.resource) && module.resource.includes(path.join(__dirname, `../node_modules/${package}/`)),
            name: package,
            chunks: 'all',
            priority: -10
        };
    });

    return result;
};

module.exports = {
    // entry: {
    //     app: path.resolve(__dirname, '../src/main.ts')
    // },
    entry: path.resolve(__dirname, '../src/main.ts'),
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    target: 'web',
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new webpack.ProgressPlugin({
            entries: true,
            modules: true,
            modulesCount: 100,
            profile: true
            // handler: (percentage, message, ...args) => { }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            favicon: path.resolve(__dirname, '../public/favicon.ico'),
            filename: 'index.html',
            inject: true // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 6,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                ...catchPackagesGrouped(),
                vendor: {
                    //除了vendorPackage包含的之外，其他的比较大的依赖包
                    test: module => {
                        let notIncludeVendor = false;
                        const conditionBase = module.resource && /\.js$/.test(module.resource);

                        vendorPackage.map(package => {
                            if (conditionBase && module.resource.includes(path.join(__dirname, `../node_modules/${package}/`))) {
                                notIncludeVendor = true;
                            }
                        });
                        return conditionBase && module.resource.includes(path.join(__dirname, '../node_modules/')) && !notIncludeVendor;
                    },
                    name: 'vendor',
                    chunks: 'all'
                },
                manifest: {
                    minChunks: Infinity
                },
                default: {
                    minChunks: 3,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimize: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, '../src'),
            use: 'babel-loader'
        }, {
            test: /\.vue$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, '../src'),
            loader: 'vue-loader'
        }, {
            test: /\.(tsx|ts)$/,
            include: path.resolve(__dirname, '../src'),
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                appendTsSuffixTo: [/\.vue$/],
                transpileOnly: true,
                experimentalWatchApi: true
            }
        }]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.vue', '.css', '.less', '.json', '.ts']
    }
};
