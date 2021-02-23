import React from 'react'

class Ch2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0
        }
    }

    componentWillUpdate() {
        console.log('Ch2 componentWillUpdate');
      }
    
      componentDidUpdate() {
        console.log('Ch2 componentDidUpdate');
      }
    
      componentDidMount(){
        console.log('Ch2 componentDidMount')
        console.log('Ch2 setState');
        this.setState({index: this.state.index + 1});
        console.log('state', this.state.index);

        console.log('Ch2 setState');
        this.setState({index: this.state.index + 1});
        console.log('state', this.state.index);
      }

      render(){
        console.log( 'Ch2 render')
        return('Ch2')
      }
}

export default Ch2