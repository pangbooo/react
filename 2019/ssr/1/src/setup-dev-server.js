const webpack = require('webpack');
const path = require('path');
const MFS = require('memory-fs');
const clientConfig = require('../config/webpack.config.client');
const serverConfig = require('../config/webpack.config.server');

module.exports = function setupDevServer(app, callback) {
    let serverEntry;
    let template;
    let resolve;
    const readyPromise = new Promise(r => resolve = r);
    const update  = () => {
        if(serverEntry && template) {
            callback(serverEntry, template);
            resolve();
        }
    }
    const readFile = (fs, fileName) => {
        return fs.readFileSync(path.join(clientConfig.output.path, fileName), "utf-8");
    }

    //修改入口文件，增加热更新文件
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
    clientConfig.output.filename = "static/js/[name]/.[hash].js";
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    // 客户端打包
    const clientCompiler = webpack(clientConfig);

    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath, //required,
        logLevel: "warn"
    });

    //使用被 webpack-dev-middle中间件服务webpack打包后的资源文件
    app.use(devMiddleware);
    /* eslint-disable no-console */
    //todo
    //https://www.webpackjs.com/api/#plugin 
    //webpack.docschina.org/api/node/#自定义文件系统-custom-file-systems-
    clientCompiler.hooks.done.tap("done", stats => {
        const info = stats.toJson();
        if (stats.hasWarnings()) {
            console.warn('clientCompiler hasWarnings',info.warnings);
        }

        if (stats.hasErrors()) {
        const info = stats.toJson();
            console.error('clientCompiler hasErrors',info.errors);
            return;
        }
        // 从webpack-dev-middleware中间件存储的内存中读取打包后的index.html文件模板
        template = readFile(devMiddleware.fileSystem, "index.html");
        update();
    });

    app.use(require("webpack-hot-middleware")(clientCompiler));

    //监视服务端打包入口文件，有更改就更新
    const serverCompiler = webpack(serverConfig);
    //自定义文件系统, 使用内存文件系统 （将文件写入到内存中，而不是写入到磁盘）
    const mfs = new MFS();
    serverCompiler.outputFileSystem = mfs;

    serverCompiler.watch({},(err, stats)=> {
        const info = stats.toJson();
        if(stats.hasWarnings()){
            console.log('serverCompiler hasWarnings', info.warnings);
        }
        if(stats.hasErrors()){
            console.log('serverCompiler hasErrors',info.errors);
            return;
        }

        //读取打包后的内容 && 编译模块
        const bundle = readFile(mfs, 'entry-server.js');
        const m = new module.constructor();
        m._compile(bundle, 'entry-server.js');
        serverEntry = m.exports; 
        //ReactDOMServer.renderToString(serverEntry)传入的是一个组件对象，我们需要使用node中的module进行编译，实例化一个module调用_compile方法，第一个参数是javascript代码，第二个自定义的名称，最后获取entry-server.js中module.exports出的对象
        update();

    });
    return readyPromise
}

