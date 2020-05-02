import React from 'react'
import FancyButton from '../FancyButton'

class forwardRef extends React.Component{

    constructor(props){
        super(props)
        this.ref = React.createRef();

    }

    componentDidMount(){
        console.log(this.ref.current)
    }

    render(){
        return (
            <FancyButton ref={this.ref}>
                Click me!
            </FancyButton>
        )
    }
    

    
}

export default forwardRef
