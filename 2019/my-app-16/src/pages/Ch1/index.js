import React from 'react'

class Ch1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0
        }
    }

    componentWillUpdate() {
        console.log('Ch1 componentWillUpdate');
      }
    
      componentDidUpdate() {
        console.log('Ch1 componentDidUpdate');
      }
    
      componentDidMount(){
        console.log('Ch1 componentDidMount')
        console.log('Ch1 setState');
        this.setState({index: this.state.index + 1});
        console.log('state', this.state.index);

        console.log('Ch1 setState');
        this.setState({index: this.state.index + 1});
        console.log('state', this.state.index);
      }

      render(){
        console.log( 'Ch1 render')
        return('Ch1')
      }
}

export default Ch1