import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
// import About from './pages/About';
// import Home from './pages/Home';
// import Topics from './pages/Topics';
// import NoMatch from './pages/NoMatch';
// import Memoize from './pages/memoize';
// import RefForward from "./pages/RefForward";
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
        {/* <li>
          <NavLink to="/memoize" activeClassName="active">Memoize</NavLink>
        </li> */}
        <li>
          <NavLink to="/refs" activeClassName="active">Ref</NavLink>
        </li>
        <li>
          <NavLink to="/test" activeClassName="active">Test</NavLink>
        </li>
      </ul>
    );
}

const Home = lazy(() => import ("./pages/Home"))
const About = lazy(() => import ("./pages/About"))
const Topics = lazy(() => import ("./pages/Topics"))
const RefForward = lazy(() => import ("./pages/RefForward"))
const NoMatch = lazy(() => import ("./pages/NoMatch"))
const Memoize = lazy(() => import ("./pages/memoize"))
const Test = lazy(() => import ("./pages/Test"))

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
                  <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path='/' component={Home} exact></Route>
                        <Route path='/about' component={About}></Route>
                        <Route path='/topics' component={Topics}></Route>
                        <Route path='/memoize' render={() => <Memoize list={list}/>} ></Route>
                        <Route path='/refs' component={RefForward}></Route>
                        <Route path='/test' component={Test}></Route>
                        {/* when none of the above match, <NoMatch> will be rendered */}
                        <Route component={NoMatch}></Route>
                    </Switch>
                  </Suspense>
                </div>
            </div>

            
        </Router>
    )
}

export default AppRouter;