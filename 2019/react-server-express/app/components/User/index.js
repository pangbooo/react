import React from 'react';

class User extends React.Component {
    render() {
        console.log(this.props)
        return (
            <h4>UserId : {this.props.match.params.id}</h4>
        );
    }
}

export default User;