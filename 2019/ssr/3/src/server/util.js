import React from 'react';
import {renderToString} from 'react-dom/server';
import { StaticRouter, Route  } from "react-router-dom";
import {Provider} from 'react-redux';
import { renderRoutes } from 'react-router-config'

export const render = (req, store, routes) => {
      const content = renderToString(
        // 必传参数 location： 传入path，确认服务端渲染的路由
        //          context：
        <Provider store={store}>
            <StaticRouter  location={req.path} context={{}}>
              <div>
                {renderRoutes(routes)}
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
              <script>
                window.context = {
                  state: ${JSON.stringify(store.getState())}
                }
              </script>
              <script src='/index.js'></script> 
            </body>
          </html>
        `
      )
}