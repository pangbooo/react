import React from 'react';
import { NestedRoute } from '../router';
import {Switch, Route, NavLink} from 'react-router-dom'
import Child from './Child';

class Parent extends React.Component {
    render(){
      // console.log('props', this.props)
        return (
            <div>
              <ul>
                <li><NavLink to='/parent/child'>Child Componetent</NavLink></li>
              </ul>
              <Switch>
                {/* {
                  this.props.router.map((route, i) => (
                    <NestedRoute key={i} {...route} />
                  ))
                } */}
                <Route path='/parent/child' render={() => <Child />}></Route>
            </Switch>
            </div>
            
            
          );
    }
}

export default Parent;