const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const ReactDOMServer = require('react-dom/server');
const matchRoutes = require('react-router-config').matchRoutes;
const app = express();
const isProd = process.env.NODE_ENV === 'production';
let serverEntry;
let template;
let readyPromise;
let createApp;
let createStore;
let router;

app.use("/public", express.static(path.join(__dirname, "../public")));

if(isProd){
     serverEntry = require('../dist/entry-server');
     createApp = serverEntry.createApp;
     createStore = serverEntry.createStore;
     router = serverEntry.router;
     template = fs.readFileSync('./dist/index.html', 'utf-8');
    
    app.use('/dist', express.static(path.join(__dirname, '../dist')));
}else {
    readyPromise = require("./setup-dev-server")(app, (entry, htmlTemplate) => {
        createApp = entry.createApp;
        createStore = entry.createStore;
        template = htmlTemplate;
        router = entry.router;
    })
}

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

const render = (req, res) => {
    // console.log('------- enter server------')
    // console.log('visit url', req.url);

    let store = createStore({});
    let preloadedState = {};
    let promises;
    
    //匹配路由
    let matchs = matchRoutes(router, req.path);
    promises = matchs.map(({ route, match }) => {
        const asyncData = route.component.asyncData;
        //match.params 获取匹配的路由参数
        return asyncData ? asyncData(store, Object.assign(match.params, req.query)) : Promise.resolve(null)
    });

    // resolve所有asyncData
    Promise.all(promises).then( () => {
        //获取预加载的state,供客户端初始化
        preloadedState = store.getState();
        //异步数据请求完成后进行服务端render
        handleRender();
    }).catch( error => {
        console.log(error);
        res.status(500).send("Internal server error")
    })

    function handleRender() {
        // 存放组件内部路由相关属性，包括状态码，地址信息，重定向的url
        let context = {};
        let component = createApp(context,  req.url, store);
        let html = ReactDOMServer.renderToString(component);
        // console.log('context', context);

        if(context.url){ // 当发生重定向时，静态路由会设置url
            res.redirect(context.url);
            return 
        }
        if( !context.status ){ // 无status字段表示路由匹配成功
            // console.log('component', JSON.stringify(component, null, 2));
            // 获取组件内的head对象，必须在组件renderToString后获取
            let head = component.type.head.renderStatic(); 
            let htmlStr = template
                          .replace(/<title>.*<\/title>/, `${head.title.toString()}`)
                          .replace('<!--react-ssr-head-->', `${head.meta.toString()}\n${head.link.toString()}
                                <script>
                                    window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState)}
                                </script>
                          `)
                          .replace('<!--react-ssr-outlet-->', `<div id='app'>${html}</div>`)
            res.send(htmlStr);
        }else{
            res.status(context.status).send(`error code ${context.status}`)
        }
    }

}

app.use(function(req,res, next){
    console.log(req.session,req.sessionID);
    next()
})
app.get('/logout', function(req, res, next){
    console.log('logout...')
    req.session.destroy(function(err) {
        res.clearCookie('connect.sid', {path: '/'});
        res.redirect('/');
        next();
      });

});

app.get('*', isProd ? render : (req, res) => {
    // 等待客户端和服务端打包完成后进行render
	readyPromise.then(() => render(req, res));
});

app.listen(3000, () => {
    console.log('You app is running')
})