import express from 'express';
import { matchRoutes } from "react-router-config"; //react-router-config 可以匹配多级路由
import { render } from './util';
import routes from '../Routes';
import { getStore } from '../store';
import proxy from 'express-http-proxy'

const app = express();
app.use(express.static('public'));
const port = 3000;

app.use('/api',proxy('http://localhost:4000', {
  proxyReqPathResolver: function (req) {
    return '/api' + req.url
  }
}));

app.get('*', (req, res) => {
  const store = getStore();

  //此处获取异步数据，存到store中;根据路由，往store添加数据
  // const matchedRoutes = matchRoutes(routes, req.path)

  // //让matchRoutes匹配的路由组件，执行组件的loadData
  // const promises = [];
  // matchedRoutes.forEach(item => {
  //   if(item.route.loadData){
  //     promises.push(item.route.loadData(store))
  //   }
  // });

  // Promise.all(promises).then( () => {
    res.send(render(req, store, routes))
  // })


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})