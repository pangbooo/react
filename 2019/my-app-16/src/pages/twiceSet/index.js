import React from "react";

class twiceSet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        index: 0
    }
  }

  componentDidMount(){
    // this.setState({ index: this.state.index + 1 }, () => {
    //     console.log(this.state.index);
    //   })
    //   this.setState({ index: this.state.index + 1 }, () => {
    //     console.log(this.state.index);
    //   })

    this.setState((preState) => ({ index: preState.index + 1 }), () => {
        console.log(this.state.index);
      })
      this.setState(preState => ({ index: preState.index + 1 }), () => {
        console.log(this.state.index);
      })
  
  }

  render(){
    return(
      <div></div>
    )
  }
}

export default twiceSet