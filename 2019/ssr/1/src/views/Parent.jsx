import React from 'react';
import NestedRoute from '../router';

class Parent extends React.Component {
    render(){
        return (
            this.props.router.map((route, i) => (
              <NestedRoute key={i} {...route} />
            ))
          );
    }
}

export default Parent;