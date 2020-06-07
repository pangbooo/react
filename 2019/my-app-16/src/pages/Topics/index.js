import React from "react";
import {  Route, Link, NavLink } from 'react-router-dom';
import Topic from '../Topic'

function Topics({match}){
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

  export default Topics