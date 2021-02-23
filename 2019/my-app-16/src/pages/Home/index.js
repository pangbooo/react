import React from "react";
import Ch1 from '../Ch1';
import Ch2 from '../Ch2';

class Home extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log('Home componentDidMount')
  }

  render(){
    console.log( 'Home render')
    return(
      <div>
        <Ch1 />
        <Ch2 />
    </div>
    )
  }
}

export default Home