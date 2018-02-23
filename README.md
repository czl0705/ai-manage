# ie8-webpack3-react
兼容ie8的基于webpack3.x打包的react + fish + react-router + redux + axios模板，样式编译支持css + scss

注意：fish为公司开发的兼容ie8的react组件库，请先切换公司内网的npm，使用cmd安装

```
设置公司npm内网地址：
1.使用命令：npm config set registry="http://registry.npm.sdp.nd/"
2.安装成功后查看：npm config list
```

## 兼容
IE9+，谷歌、火狐，其他暂未测试

## 命令操作
```
#安装
$ npm install

#开发运行
$ npm run dev

#打包
$ npm run build
```

## 参考链接：
1.  https://doc.webpack-china.org/concepts/
2.  https://github.com/brickspert/blog/issues/1

## 进度
目前剩下【IE8打包问题】，难点在于：使用webpack 3.x 打包怎么配置使其不会在IE8下报错