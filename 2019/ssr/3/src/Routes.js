import {Route} from 'react-router-dom';
import React from 'react';
import Home from './containers/Home';
import Login from './containers/Login';

export default(
    <div>
        <Route path='/' component={Home} exact></Route>
        <Route path='/login' component={Login} exact></Route>
    </div>
)
