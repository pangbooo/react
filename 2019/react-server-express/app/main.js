import React from 'react';
import { Route, Link, NavLink, Switch } from "react-router-dom";

import Home from './components/Home';
import About from './components/About';
import Users from './components/Users';
import User from './components/User';

const App = () =>{
  return (
    <div>
      <NavLink to='/' activeClassName="hurray">Home</NavLink> 
      <Link to='/about'>About</Link>
      <Link to='/users'>Users</Link>

      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/users" component={Users} />
    </div>
  )
}

export default App;