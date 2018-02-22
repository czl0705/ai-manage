const merge = require('webpack-merge'); //合并配置插件
const path = require('path');   //处理路径，nodeJS内置模块
const webpack = require('webpack');
const UnglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');  //压缩插件
const CleanWebpackPlugin = require('clean-webpack-plugin');     //清理文件插件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');    //抽取css

const commonConfig = require('./webpack.config.common');

// 生产配置
const prodConfig = {
    // 出口
    output: {
        filename: './assets/js/[name].[chunkhash].js',
        chunkFilename: './assets/js/[name].[chunkhash].js',

        // 静态服务器地址接口
        publicPath: '/'
    },

    // 文件处理
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,

                // 注意顺序，先引用style-loader在引用css-loader，否则会解析出错
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',

                            // 图片打包目录
                            outputPath: 'assets/img/',

                            // 设定大小，小于该值(5kb)的图片会被转义为base64
                            limit: 5120
                        }
                    }
                ]
            }
        ]
    },

    // 插件
    plugins: [
        // 压缩
        new UnglifyjsWebpackPlugin({
            uglifyOptions: {
                ie8: true   //压缩后IE8可解析
            }
        }),

        // 指定环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        // 打包前清理dist目录下的文件 - 暂时保留api文件
        new CleanWebpackPlugin(['dist/assets', 'dist/index.html']),

        // 抽取css
        new ExtractTextWebpackPlugin({
            filename: 'assets/css/[name].[contenthash:5].css',
            allChunks: true
        })
    ],

    // 调试
    devtool: 'cheap-module-source-map'
}

module.exports = merge(commonConfig, prodConfig);
