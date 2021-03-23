const express = require('express')
const app = express()
const port = 3000;
const Home = require('./containers/Home');

app.get('/', (req, res) => {
  res.send(`
  <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">hello world</div>
      </body>
    </html>
  `)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})