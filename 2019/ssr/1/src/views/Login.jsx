import React from 'react';
import {Helmet} from 'react-helmet';

class Login extends React.Component {
    constructor(props){
        super();
    }

    handleLogOut(){
        console.log('handleLogOut...');
        window.location.href = 'http://localhost:3000/logout';
    }
    render(){
        return (
            <div>
              <Helmet>
                <title>LogOut</title>
              </Helmet>
              <button onClick={this.handleLogOut.bind(this)}>LogOut</button>
            </div>
          );
    }
}

export default Login;