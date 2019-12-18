const express = require('express');
const fs = require('fs');
const path = require('path');
const ReactDOMServer = require('react-dom/server')
const app = express();
const isProd = process.env.NODE_ENV === 'production';
let serverEntry;
let template;

app.use("/public", express.static(path.join(__dirname, "../public")));

if(isProd){
    let serverEntry = require('../dist/entry-server');
    let template = fs.readFileSync('./dist/index.html', 'utf-8');
    
    app.use('/dist', express.static(path.join(__dirname, '../dist')));
}else {
    require("./setup-dev-server")(app, (entry, htmlTemplate) => {
        serverEntry = entry;
        template = htmlTemplate
    })
}

const render = (req, res) => {
    console.log('==== enter server ======')
    console.log('visit url', req.url);

    let html = ReactDOMServer.renderToString(serverEntry);
    let htmlStr = template.replace('<!--react-ssr-outlet-->', `<div id='app'>${html}</div>`);
    res.send(htmlStr);
}

app.get('*', render);

app.listen(3000, () => {
    console.log('You app is running')
})