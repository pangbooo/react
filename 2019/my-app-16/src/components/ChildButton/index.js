import React from 'react';

class ChildButton extends React.Component{
    getAlert(){
        console.log('get from ChildButton')
    }

    render(){
        return(
            <div>ChildButton Component</div>
        )
    }
}

export default ChildButton