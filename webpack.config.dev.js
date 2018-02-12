const path = require('path');   //处理路径，nodeJS内置模块
const webpack = require('webpack');

let HtmlWebpackPlugin = require('html-webpack-plugin');

// 暴露模块
module.exports = {
    // 入口，__dirname：表示根目录，path.join：连接多个路径
    entry: {
        app: [
            "react-hot-loader/patch",
            path.join(__dirname, 'src/index.js')
        ],

        // 提取公用模块
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },

    // 出口
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // [path]：图片路径 [ext]：图片类型
                        name: '[path][name].[ext]',

                        // 设定大小，小于该值的图片会被转义为base64
                        limit: 10240
                    }
                }]
            }
        ]
    },

    // 插件
    plugins: [
        // 热更新
        new webpack.HotModuleReplacementPlugin(),

        // 模板页面
        new HtmlWebpackPlugin({
            // 生成后页面名称
            filename: 'index.html',

            // 模板路径
            template: path.join(__dirname, 'src/index.html')
        }),

        // 抽离公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
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
            reducers: path.join(__dirname, 'src/redux/reducers'),
            img: path.join(__dirname, 'public/images')
        }
    },

    // 调试
    devtool: 'inline-source-map'
};
