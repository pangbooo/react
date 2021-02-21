import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Counter from './pages/Counter'
import NoMatch from './pages/NoMatch';
const list =[
  {
    id: 0,
    text: '0'
  },
  {
    id: 1,
    text: '1'
  },
]
function Menu() {
    return (
      <ul className='menu'>
        <li>
          <NavLink to="/" activeClassName="active" exact>Home</NavLink>
        </li>
        <li>
          <NavLink to="/counter" activeClassName="active" exact>reducer Counter</NavLink>
        </li>
      </ul>
    );
}

function AppRouter(){
    return (
        <Router>
            <div className='app'>
                <Menu />
                {/*
                    Switch: 用于包裹Route， 只渲染匹配到的第一个Route
                            常用于404组件
                    Route -> exact : 只有当路由完全匹配才会渲染
                */}
                <div className='content'>
                  <Switch>
                      <Route path='/' component={Home} exact></Route>
                      <Route path='/counter' component={Counter} exact></Route>
                      {/* when none of the above match, <NoMatch> will be rendered */}
                      <Route component={NoMatch}></Route>
                  </Switch>
                </div>
            </div>

            
        </Router>
    )
}

export default AppRouter;