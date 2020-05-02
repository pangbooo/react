import React from 'react'

const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} >
        {props.children}
    </button>
))


export default FancyButton