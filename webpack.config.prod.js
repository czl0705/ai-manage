const path = require('path');   //处理路径，nodeJS内置模块
const webpack = require('webpack');

let HtmlWebpackPlugin = require('html-webpack-plugin'); //模板插件
const UnglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');  //压缩插件
const CleanWebpackPlugin = require('clean-webpack-plugin');     //清理文件插件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');    //抽取css

// 暴露模块
module.exports = {
    // 入口，__dirname：表示根目录，path.join：连接多个路径
    entry: {
        app: [
            path.join(__dirname, 'src/index.js')
        ],

        // 提取公用模块
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },

    // 出口
    output: {
        path: path.join(__dirname, './dist'),
        filename: './assets/js/[name].[chunkhash].js',
        chunkFilename: './assets/js/[name].[chunkhash].js',

        // 静态服务器地址接口
        publicPath: '/'
    },

    // 文件处理
    module: {
        rules: [
            {
                // 目标文件，正常使用正则匹配
                test: /\.js$/,

                // 使用的解析器，cacheDirectory是用来缓存编译结果，下次编译加速
                use: ['babel-loader?cacheDirectory=true'],

                // 指定目录
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,

                // 注意顺序，先引用style-loader在引用css-loader，否则会解析出错
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
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
        // 模板页面
        new HtmlWebpackPlugin({
            // 生成后页面名称
            filename: 'index.html',

            // 模板路径
            template: path.join(__dirname, 'src/index.html')
        }),

        // 处理缓存- hash
        new webpack.HashedModuleIdsPlugin(),

        // 抽离公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),

        // 优化公共模块缓存
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),

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

        // 打包前清理dist目录下的文件 - 暂时注释
        // new CleanWebpackPlugin(['dist']),

        // 抽取css
        new ExtractTextWebpackPlugin({
            filename: 'assets/css/[name].[contenthash:5].css',
            allChunks: true
        })
    ],

    // 解析
    resolve: {
        // 配置别名
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
            img: path.join(__dirname, 'public/images')
        }
    },

    // 调试
    devtool: 'cheap-module-source-map'
};
