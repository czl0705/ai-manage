const merge = require('webpack-merge'); //合并配置插件
const path = require('path');   //处理路径，nodeJS内置模块
const webpack = require('webpack');

const commonConfig = require('./webpack.config.common');

// 开发配置
const devConfig = {
    // 入口，__dirname：表示根目录，path.join：连接多个路径
    entry: {
        app: [
            "react-hot-loader/patch",
            path.join(__dirname, 'src/index.js')
        ]
    },

    // 出口
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },

    // 文件处理
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,

                // 注意顺序，先引用style-loader在引用css-loader，否则会解析出错
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
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

        // 开启 mock
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
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

    // 调试
    devtool: 'inline-source-map'
}

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);
