import React from 'react';
import { Route, Link, Switch } from "react-router-dom";
import User from '../User';

class Users extends React.Component {
    render() {
        const { match} = this.props;

        return (
            <div>
                <h3>Users</h3>
                <Link to={`${match.url}/1`}>Details</Link>

                <Route path={`${match.path}/:id`} component={User} />
            </div>
        );
    }
}

export default Users;