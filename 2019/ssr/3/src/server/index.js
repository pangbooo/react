import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Home from '../containers/Home';

const app = express();
app.use(express.static('public'));
const port = 3000;
const content = renderToString(<Home />)

app.get('/', (req, res) => {
  res.send(`
  <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src='/index.js'></script>
      </body>
    </html>
  `)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})