const express = require('express');
const fs = require('fs');
const path = require('path');
const ReactDOMServer = require('react-dom/server')
const app = express();
const isProd = process.env.NODE_ENV === 'production';
let serverEntry;
let template;
let readyPromise;
let createApp;

app.use("/public", express.static(path.join(__dirname, "../public")));

if(isProd){
    let serverEntry = require('../dist/entry-server');
    let createApp = serverEntry.createApp;
    let template = fs.readFileSync('./dist/index.html', 'utf-8');
    
    app.use('/dist', express.static(path.join(__dirname, '../dist')));
}else {
    readyPromise = require("./setup-dev-server")(app, (entry, htmlTemplate) => {
        createApp = entry.createApp;
        template = htmlTemplate
    })
}

const render = (req, res) => {
    console.log('--------------------- enter server----------------------')
    console.log('visit url', req.url);

    let context = {};
    let component = createApp(context,  req.url);
    let html = ReactDOMServer.renderToString(component);
    console.log('context', context);

    if(context.url){ // 当发生重定向时，静态路由会设置url
        res.redirect(context.url);
        return 
    }

    if( !context.status ){ // 无status字段表示路由匹配成功
        console.log('component', JSON.stringify(component, null, 2));
        // 获取组件内的head对象，必须在组件renderToString后获取
        let head = component.type.head.renderStatic(); 
        let htmlStr = template
                      .replace(/<title>.*<\/title>/, `${head.title.toString()}`)
                      .replace('<!--react-ssr-head-->', `${head.meta.toString()}\n${head.link.toString()}`)
                      .replace('<!--react-ssr-outlet-->', `<div id='app'>${html}</div>`)
        res.send(htmlStr);
    }else{
        res.status(context.status).send(`error code ${context.status}`)
    }

    
}

app.get('*', isProd ? render : (req, res) => {
    // 等待客户端和服务端打包完成后进行render
	readyPromise.then(() => render(req, res));
});

app.listen(3000, () => {
    console.log('You app is running')
})