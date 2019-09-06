import React from 'react';
import { Route, Link, NavLink, Switch } from "react-router-dom";
import {  RedirectWithStatus } from '../utils.js';

import Home from './components/Home';
import About from './components/About';
import Users from './components/Users';
import User from './components/User';
import NotFound from './components/NotFound';

const App = () =>{
  return (
    <div>
        <NavLink to='/' activeClassName="hurray">Home</NavLink> 
        <Link to='/about'>About</Link>
        <Link to='/users'>Users</Link>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/users" component={Users} />
          <Route component={NotFound} />

          <RedirectWithStatus status={301} from="/" to="/about" />
          <RedirectWithStatus status={302} from="/about" to="/users" />

        </Switch>
    </div>
  )
}

export default App;