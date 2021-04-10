import App from './App';
import Home from './containers/Home';
import Login from './containers/Login';

//路由改造
export  default [
  {
    path: '/',
    component: App,
    key: 'app',
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
        loadData: Home.loadData,
        key: 'home'
      },
      {
          path: "/login",
          component: Login,
          exact: true,
          key: 'login'
        }
    ],
  }
];


// export default(
//     <div>
//         <Route path='/' component={Home} exact></Route>
//         <Route path='/login' component={Login} exact></Route>
//     </div>
// )
