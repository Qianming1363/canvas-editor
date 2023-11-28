- webpack 构建 vue3 React 项目
- 构建 sdk 工具链

安装 webpack webpack-cli

```bash

  webpack --mode=development --watch
  webpack --mode=production

```

### 打包结果分析

webpack esm 打包

是否可以将对应包代码合并为 esm，指定对应 esm

- bundle 分包构建

开启 watch 每一次文件变化，从编译开始

loader: 对代码的处理
plugin: 在某些时候做某些事情，在 webpack 构建流程中

插件 apply 只运行一次 在 apply 内部注册事件

```js
compiler.hook.事件名称.tap();

module.erxports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: "./src/index.js",
    main: "xxxxx",
  },
  context: path.resolve(__dirname, "src"), // 影响入口和loaders的路径
  output: {
    library: "abc", // 库模式， 比如jquery 全局暴露$
  },
  // 不参与打包使用cdn
  externals: {
    jquery: "$",
    lodash: "_",
  },
};
```

常用的 loader, plugin
vue 项目的配置
eslint,babel husky 配置

clean-webpack-plugin 清除输出目录
html-webpack-plugin 自动生成页面
copy-webpack-plugin 复制静态资源
webpack-dev-server

file-loader 处理文件导入
url-loader 将图片处理为字符串

publicPath 有些插件和 loader 会使用 通常写 /

webpack 内置插件
DefinePlugin 配置一些全局的常量
BannerPlugin 为没一个代码文件添加版权信息
ProvidePlugin 配置常用模块，无需导入

mini- css-extract-plugin

### webpack 性能优化

构建性能

- 减少模块解析
  哪些模块不需要解析：无其他依赖 已经打包好的 jQuery noParse
