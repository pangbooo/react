import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
function Header() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>
    );
  }
  function Index() {
    return <h2>Home</h2>;
  }
  
  function About() {
    return <h2>About</h2>;
  }

  function NoMatch(){
      return <h2>NoMatch</h2>
  }
  
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
                    {/* when none of the above match, <NoMatch> will be rendered */}
                    <Route component={NoMatch}></Route>
                </Switch>
            </div>

            
        </Router>
    )
}

export default AppRouter;