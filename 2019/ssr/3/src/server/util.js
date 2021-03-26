import React from 'react';
import {renderToString} from 'react-dom/server';
import { StaticRouter } from "react-router-dom";
import Routes from '../Routes';

export const render = (req) => {
    const content = renderToString(
        // 必传参数 location： 传入path，确认服务端渲染的路由
        //          context：
        <StaticRouter  location={req.path} context={{}}>
          {Routes}
        </StaticRouter>
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