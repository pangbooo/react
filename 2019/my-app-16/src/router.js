import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
             <Link to={`${match.url}/props-v-state`}>Props v. State</Link>  
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

                <Route path='/' component={Index} exact></Route>
                <Route path='/about' component={About}></Route>
                <Route path='/topics' component={Topics}></Route>
            </div>

            
        </Router>
    )
}

export default AppRouter;