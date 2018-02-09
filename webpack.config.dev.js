const path = require('path');   //处理路径，nodeJS内置模块

// 暴露模块
module.exports = {
    // 入口，__dirname：表示根目录，path.join：连接多个路径
    entry: path.join(__dirname, 'src/index.js'),

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
    plugins: [],

    // 服务
    devServer: {}
};
