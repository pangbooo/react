import React from 'react'

function logProps(Component) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps){
            console.log('old props:', prevProps);
            console.log('new props', this.props)
        }

        render(){
            const {forwardedRef, ...rest} = this.props;
            return <Component ref={forwardedRef} {...rest}/>
        }
    }

    return React.forwardRef((props,ref) => (
        <LogProps {...props} forwardedRef={ref}/>
    ))
}

export default logProps