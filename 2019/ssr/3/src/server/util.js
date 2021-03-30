import React from 'react';
import {renderToString} from 'react-dom/server';
import { StaticRouter, Route  } from "react-router-dom";
import { matchRoutes } from "react-router-config"; //react-router-config 可以匹配多级路由
import {Provider} from 'react-redux'
import Routes from '../Routes';
import getStore from '../store'


export const render = (req) => {
    const store = getStore();
    //此处获取异步数据，存到store中
    //根据路由，往store添加数据

    const matchedRoutes = matchRoutes(Routes, req.path)

    //让matchRoutes匹配的路由组件，执行组件的loadData
    console.log('matchedRoutes', matchedRoutes)
    
    const content = renderToString(
        // 必传参数 location： 传入path，确认服务端渲染的路由
        //          context：
        <Provider store={store}>
            <StaticRouter  location={req.path} context={{}}>
              <div>
                  {
                    Routes.map(route => (<Route {...route}></Route>))
                  }
              </div>
                
            </StaticRouter>
        </Provider>
      );

      return(
        `
        <html>
            <head>
              <title>ssr</title>
            </head>
            <body>
              <div id="root">${content}</div>
              <!--引入客户端打包js文件，执行事件绑定-->
              <script src='/index.js'></script> 
            </body>
          </html>
        `
      )
}