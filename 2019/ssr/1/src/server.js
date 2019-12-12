const express = require('express');
const fs = require('fs');
const path = require('path');
const ReactDOMServer = require('react-dom/server')
const app = express();

let serverEntry = require('../dist/entry-server');
let template = fs.readFileSync('./dist/index.html', 'utf-8');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use("/public", express.static(path.join(__dirname, "../public")));

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