import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div onClick={()=> window.alert(about)}>about</div>
        );
    }
}

export default Home;