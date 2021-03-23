// server/index.js
import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Home from '../containers/Home';

const app = express();
app.use(express.static('public'));
const content = renderToString(<Home />);
app.get('/', function (req, res) {
   res.send(
   `
    <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
   `
   );
})
app.listen(3001, () => {
  console.log('listen:3001')
})

