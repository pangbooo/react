import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Topics from './pages/Topics';
import NoMatch from './pages/NoMatch';
import Memoize from './pages/memoize';
import RefForward from "./pages/RefForward";
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
          <NavLink to="/about" activeClassName="active">About</NavLink>
        </li>
        <li>
          <NavLink to="/topics" activeClassName="active">Topics</NavLink>
        </li>
        <li>
          <NavLink to="/memoize" activeClassName="active">Memoize</NavLink>
        </li>
        <li>
          <NavLink to="/refs" activeClassName="active">Ref转发</NavLink>
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
                      <Route path='/about' component={About}></Route>
                      <Route path='/topics' component={Topics}></Route>
                      <Route path='/memoize' render={() => <Memoize list={list}/>} ></Route>
                      <Route path='/refs' component={RefForward}></Route>
                      {/* when none of the above match, <NoMatch> will be rendered */}
                      <Route component={NoMatch}></Route>
                  </Switch>
                </div>
            </div>

            
        </Router>
    )
}

export default AppRouter;