import React from 'react'
import { createStore } from 'redux'
import { StaticRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { renderToString } from 'react-dom/server'
import path from 'path';
import App from "./app/main.js";
import reducer from './app/reducers/index'

const config = require('./webpack.config.js');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require("webpack-dev-middleware")
const compiler = webpack(config);


const express = require('express');
const app = express();

//配置HOR
app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

//配置基础模版引擎、静态目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'dist')));


app.get('/*',function(req, res){
    console.log('req.url.....', req.url);
    const context = {};
    const store = createStore(reducer);

    let jsx = (
        <ReduxProvider store={ store }>
            <StaticRouter context={context} location={ req.url }>
                <App />
            </StaticRouter>
        </ReduxProvider>
    );

    let str = renderToString(jsx);
    const state = store.getState();

    console.log('context', context)
    if (context.url) {
        res.writeHead(301, {
            Location: context.url
          });
          res.end();
      } else {
        res.render('index', { root: str, state });
      }

});

app.listen(3000, () => console.log('app listening on port 3000!'))