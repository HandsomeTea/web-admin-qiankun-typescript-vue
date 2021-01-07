/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanCSSPlugin = require('less-plugin-clean-css');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const isTestBuild = process.argv.includes('-build-test');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    stats: 'errors-only',
    output: {
        filename: 'javascript/[hash:20][id].js'
        // filename: 'javascript/[name].js'
    },
    optimization: {
        concatenateModules: true
    },
    plugins: [
        ...isTestBuild ? [new BundleAnalyzerPlugin()] : [],
        new webpack.LoaderOptionsPlugin({
            options: {
                productionGzip: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[hash:20][chunkhash].css',
            chunkFilename: 'style/[hash:20][id].css',
            ignoreOrder: false
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }]
            },
            canPrint: true
        }),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            test: /\.(js|css|html|svg)$/,
            threshold: 8192,
            include: path.resolve(__dirname, '../src')
        })
        // // 将静态内容(如文档等)复制到build结果中
        // new CopyPlugin({
        //     patterns: [{ from: path.resolve(__dirname, '../src/views/docs'), to: path.resolve(__dirname, '../dist/docs') }],
        //     options: {}
        // })
    ],
    module: {
        rules: [{
            test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|ico|pub)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    esModule: false,
                    outputPath: 'image',
                    publicPath: '../image',
                    name: '[hash:20].[ext]'
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
                loader: 'css-loader',
                options: {
                    importLoaders: 1
                }
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        plugins: [
                            new CleanCSSPlugin({
                                advanced: true
                            })
                        ]
                    }
                }
            }, {
                loader: 'style-resources-loader',
                options: {
                    patterns: [path.resolve(__dirname, '../src/assets/css/global-var.less')]
                }
            }]
        }]
    }
});
