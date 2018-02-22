const path = require('path');   //处理路径，nodeJS内置模块
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //模板插件

/* 这是公共配置 */
commonConfig = {
    entry: {
        app: [
            // 入口，__dirname：表示根目录，path.join：连接多个路径
            path.join(__dirname, 'src/index.js')
        ],

        // 提取公用模块
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    output: {
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [
            {
                // 目标文件，正常使用正则匹配
                test: /\.js$/,

                // 使用的解析器，cacheDirectory是用来缓存编译结果，下次编译加速
                use: ['babel-loader?cacheDirectory=true'],

                // 指定目录
                include: path.join(__dirname, 'src')
            }
        ]
    },
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
}

module.exports = commonConfig;