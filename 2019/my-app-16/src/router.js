import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Counter from './pages/Counter'
import Ref from './pages/Ref'
import FetchDataPageWithCustomHook from './pages/FetchDataPageWithCustomHook'
import SyntheticEvent from './pages/SyntheticEvent'
import CaptureValue from './pages/CaptureValue'
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
        <li>
          <NavLink to="/useRef" activeClassName="active" exact>useRef</NavLink>
        </li>
        <li>
          <NavLink to="/CaptureValue" activeClassName="active" exact>Capture Value</NavLink>
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
                      <Route path='/useRef' component={Ref} exact></Route>
                      <Route path='/fetchDataPageWithCustomHook' component={FetchDataPageWithCustomHook} exact></Route>
                      <Route path='/SyntheticEvent' component={SyntheticEvent} exact></Route>
                      <Route path='/CaptureValue' component={CaptureValue} exact></Route>
                      {/* when none of the above match, <NoMatch> will be rendered */}
                      <Route component={NoMatch}></Route>
                  </Switch>
                </div>
            </div>

            
        </Router>
    )
}

export default AppRouter;