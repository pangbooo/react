import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import Header from './components/Header'
import About from './components/About'
import Index from './components/Index'
import NoMatch from './components/NoMatch'
import forwardRef from './components/forwardRef'

  
  function Topic({match}) {
    console.log('Topic match', match)
    return <h3> Requset Param: {match.params.id}</h3>
  }

  function Topics({match}){
    console.log('Topics match', match)
    return (
    <div>
      <h2>Topics</h2>
      
      <ul>
          <li>
            <Link to={`${match.url}/components`}>Components</Link> 
         </li>
         <li>
             <NavLink to={`${match.url}/props-v-state`} activeClassName="active">Props v. State</NavLink>  
         </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic}></Route>
      <Route exact path={match.path} render={() => <h3>Please select a topic</h3>}></Route>
    </div>
    )
    
  }

function AppRouter(){
    return (
        <Router>
            <div>
                <Header />
                {/*
                    Switch: 用于包裹Route， 只渲染匹配到的第一个Route
                            常用于404组件
                */}
                <Switch>
                    <Route path='/' component={Index} exact></Route>
                    <Route path='/about' component={About}></Route>
                    <Route path='/topics' component={Topics}></Route>
                    <Route path='/forwardRef' component={forwardRef}></Route>
                    {/* when none of the above match, <NoMatch> will be rendered */}
                    <Route component={NoMatch}></Route>
                </Switch>
            </div>

            
        </Router>
    )
}

export default AppRouter;