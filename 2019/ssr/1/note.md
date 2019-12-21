# 搞不清楚的知识点

## webpack
### 1.path.resolve()
path.resolve:方法会把一个路径或路径片段的序列解析为一个绝对路径。

例: 如果当前工作目录为 /home/myself/node
    path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
==> "/home/myself/node/wwwroot/static_files/gif/image.gif"

### 2.__dirname
当前模块的目录名
例： 从 /Users/mjr 运行 node example.js：
```javascript
    console.log(__dirname);
    // 打印: /Users/mjr
```

### 3.output.path
目标输出目录 path 的绝对路径

### 4.output.publicPath
配置项目所有引用的资源（css，js，img等）的基础路径，被成为公共路径。

这个基础路径要配合具体资源中指定的路径使用，所以其实打包后资源的访问路径可以用如下公式表示：
静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
静态资源最终访问路径 是相对于打包后的index.html的相对路径   

例：
```javascript
output.publicPath = '/dist/'

// image
options: {
 	name: 'img/[name].[ext]?[hash]'
}

// 最终图片的访问路径为
output.publicPath + 'img/[name].[ext]?[hash]' = '/dist/img/[name].[ext]?[hash]'

// js output.filename
output: {
	filename: '[name].js'
}
// 最终js的访问路径为
output.publicPath + '[name].js' = '/dist/[name].js'

// extract-text-webpack-plugin css
new ExtractTextPlugin({
	filename: 'style.[chunkhash].css'
})
// 最终css的访问路径为
output.publicPath + 'style.[chunkhash].css' = '/dist/style.[chunkhash].css'

```
参考：
https://juejin.im/post/5ae9ae5e518825672f19b094

## babel
### Polyfill
- 1.@babel/polyfill 模块包括 core-js 和自定义 regenerator runtime 来模拟完整的 ES2015+ 环境。
- 2.幸运的是，对于我们来说，我们使用的是 env preset，其中有一个 "useBuiltIns" 选项，当设置为 "usage" 时，实际上将应用上面提到的最后一个优化，只包括你需要的 polyfill

### Plugins & Presets
我们可以使用 "preset" 来代替预先设定的一组插件，而不是逐一添加我们想要的所有插件。

### babel相关的包
- __babel-loader__：使用 Babel 转换 JavaScript依赖关系的 Webpack 加载器
- __@babel/core__ ：即 babel-core，将 ES6 代码转换为 ES5
- __@babel/preset-env__ ：即 babel-preset-env，根据您要支持的浏览器，决定使用哪些 transformations / plugins 和 polyfills，
                         例如为旧浏览器提供现代浏览器的新特性
- __@babel/preset-react__ ：即 babel-preset-react，针对所有 React 插件的 Babel 预设，例如将 JSX 转换为函数

> **注：babel 7 使用了 @babel 命名空间来区分官方包，因此以前的官方包 babel-xxx 改成了 @babel/xxx

## 开发环境热更新
客户端-使用webpack-dev-middleware和webpack-hot-middleware这两个中间件。 

### webpack-dev-middleware
webpack-dev-middleware中间件不会把打包后的资源写入磁盘而是在内存中处理，当文件内容变动时会进行重新编译.
https://www.npmjs.com/package/webpack-dev-middleware


### webpack-hot-middleware
该模块仅涉及将浏览器客户端连接到Webpack服务器并接收更新的机制。 它将订阅来自服务器的更改，并使用webpack的HMR API执行这些更改。 实际上，使您的应用程序能够使用热重载进行无缝更改超出了范围，并且通常由另一个库处理。（HotModuleReplacementPlugin）
https://github.com/webpack-contrib/webpack-hot-middleware