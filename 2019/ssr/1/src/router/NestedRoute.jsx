import React from 'react';
import { Route } from 'react-router-dom';

const NestedRoute = (route) => {
    <Route path={route.path} 
           exact={route.exact}
           render={(props) => <route.component {...props} router={route.routes}/>}  /*渲染路由对应的视图组件，将路由组件的props传递给视图组件*/
    ></Route>
}

export default NestedRoute;