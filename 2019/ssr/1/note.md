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

### 5.HMR
- 1) webpack --watch
- 2) webpack-dev-server
- 3) *express with webpack-dev-middleware and webpack-hot-middleware

### 6.代码分离
- 1）入口起点：使用 entry 配置手动地分离代码。
```javascript
entry: {
        app: './src/index.js',
        another: './src/another-module.js'
    },
```

- 2)防止重复(prevent duplication) 
- 3)动态导入

#### react Code Splitting
reacttraining.com/react-router/web/guides/code-splitting
- 1) webpack
- 2) @babel/plugin-syntax-dynamic-import 
> The plugin simply allows Babel to parse dynamic imports so webpack can bundle them as a code split
- 3) loadable-components 
> is a library for loading components with dynamic imports.It handles all sorts of edge cases automatically and makes code splitting simple

```javascript
import loadable from '@loadable/component';
import Loading from './Loading.js';

const LoadingComponent = loadable(() => import('./Dashboard.js'), {
  fallback: <Loading />
});

export default class LoadableDashboard extends React.Componet {
  render(){
    return <LoadableComponet />;
  }
}

```

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
使用webpack-dev-middleware和webpack-hot-middleware这两个中间件。 

### webpack-dev-middleware
webpack-dev-middleware中间件不会把打包后的资源写入磁盘而是在内存中处理，当文件内容变动时会进行重新编译.
https://www.npmjs.com/package/webpack-dev-middleware


### webpack-hot-middleware
该模块仅涉及将浏览器客户端连接到Webpack服务器并接收更新的机制。 它将订阅来自服务器的更改，并使用webpack的HMR API执行这些更改。 实际上，使您的应用程序能够使用热重载进行无缝更改超出了范围，并且通常由另一个库处理。（HotModuleReplacementPlugin）
https://github.com/webpack-contrib/webpack-hot-middleware

## NodeJS
### 1.环境变量 / process.env.NODE_ENV
https://juejin.im/post/5a4ed5306fb9a01cbc6e2ee2
https://www.webpackjs.com/guides/production/#%E6%8C%87%E5%AE%9A%E7%8E%AF%E5%A2%83

process.env 是NodeJs 环境下的一个包含用户环境的对象
> 技术上讲，NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境(dev-vs-prod)下，server tools(服务期工具)、build scripts(构建脚本) 和 client-side libraries(客户端库) 的行为。然而，与预期相反，无法在构建脚本 webpack.config.js 中，将 process.env.NODE_ENV 设置为 "production"，请查看 #2537。因此，在 webpack 配置文件中，process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js' 这样的条件语句，无法按照预期运行。


#### 定义
通过设置package.json script 
``` javascript
{"dev" : "webpack-dev-server NODE_ENV='development' "}
```
__问题__：      
在编译时候，这样的条件语句，在 webpack 配置文件中，无法按照预期运行。
``` javascript
process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js' 
```


__解决__：        
配置DefinePlugin。DefinePlugin 允许创建一个在__编译时__可以配置的全局常量。

``` javascript
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
 ```
- 从 webpack v4 开始, 指定 mode 会自动地配置 DefinePlugin：
```javascript
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});
```
任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量，所以以下检查也是有效的：
```javascript
if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }
```

### 2.process.argv
process.argv 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数。                         
第一个元素是 process.execPath。 如果需要访问 argv[0] 的原始值，参阅 process.argv0。 第二个元素将是正在执行的 JavaScript 文件的路径。 其余元素将是任何其他命令行参数。
```javascript
[ '/home/pangbo/.nvm/versions/node/v10.12.0/bin/node',
  '/home/pangbo/pb/workspace/react-music-player/script/customized-build',
  'start' ]
```

### 3.cross-env
croee-env npm包，运行跨平台设置和使用环境变量的脚本
__windows不支持NODE_ENV=development的设置方式。__ 这个迷你的包(cross-env)能够提供一个设置环境变量的scripts，让你能够以unix方式设置环境变量，然后在windows上也能兼容运行。
```
"scripts": {
    "start": "cross-env NODE_ENV=production node src/server.js",
  }
```

## eslint 
- 1.eslint和webpack 需要安装eslint-loader， 在rules中配置
- 2.eslint和react   需要安装elint-plugin-react
```javascript
"extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ]
```

## 浏览器相关
### 1.浏览器同源政策及其规避方法
https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html

#### 概念
1）同源：协议, 域名, 端口 相同
http://www.example.com/dir/page.html

- 协议： http
- 域名： www.example.com
- 端口： 默认80

2）限制范围
- Cookie, LocalStorage, IndexDB 无法读取
- DOM 无法获取
- AJAX 请求不能发送

### Cookie
...
### iframe
对于完全不同源的网站，目前有三种方法，可以解决跨域窗口的通信问题。
- 片段识别符
- window.name
- 跨文档通信API(Cross-document messagin) 
....

### AJAX
同源政策规定，AJAX请求只能发给同源的网址，否则就报错。
除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制。

- JSONP 
- WebSocket
- __CORS__

#### JSONP
原理： 网页通过添加一个<script>元素，向服务器请求JSON数据，这种做法不受同源政策限制。                             
      服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。
```javascript
function addScriptTag(src){
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = src;
  document.body.appendChild(script);
}
windown.onload = function(){
  addScriptTag('http://example.com/ip?callback=foo')
}
function foo(data){
  console.log('Your public IP address is: ' + data.ip)
}
```
__注意，该请求的查询字符串有一个callback参数，用来指定回调函数的名字，这对于JSONP是必需的。服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。__

```javascript
foo({
  "ip": "8.8.8.8"
});
```
优点：简单适用，老式浏览器全部支持
缺点： 1.只能法GET请求。 2.后台需要配合修改 （服务端必须要调整以返回callback(...)）


