const path = require('path');   //处理路径，nodeJS内置模块
const webpack = require('webpack');

// 暴露模块
module.exports = {
    // 入口，__dirname：表示根目录，path.join：连接多个路径
    entry: [
        "react-hot-loader/patch",
        path.join(__dirname, 'src/index.js')
    ],

    // 出口
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
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
            }
        ]
    },

    // 插件
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    // 服务
    devServer: {
        // URL的根目录
        contentBase: path.join(__dirname, './dist'),

        // 一切服务都启用gzip压缩
        compress: true,

        // 任意的404响应都被替代为index.html
        historyApiFallback: true,

        // 服务器地址，默认是localhost
        host: 'localhost',

        // 启用热替换
        hot: true,

        // 运行后，自动在浏览器中打开
        open: true,

        // 端口号(默认8080)
        port: 9292
    },

    // 解析
    resolve: {
        // 配置别名
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
        }
    }
};
