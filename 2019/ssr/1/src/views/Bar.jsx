import React from 'react';
import {Helmet} from 'react-helmet';

class Bar extends React.Component {
  
  componentDidMount(){
    console.log('componentDidMount')
  }

  componentDidUpdate(prevProps, preState){
    console.log('componentDidUpdate...........');
    console.log(prevProps)
    console.log(this.props);

    if(prevProps.location.pathname !== this.props.location.pathname){
      console.log('url has changed');
      // this.forceUpdate();
      // 使用forceUpdate(),会进入componentDidUpdate，不会进入componentDidMount
    }
  }

  handlePush(){
    console.log('handlePush...............')
    let { location } = this.props;
    this.props.history.push(location.pathname + '/a')
  }

  render(){
      return (
          <div>
            <Helmet>
              <title>Bar</title>
            </Helmet>
            <div>
              Bar
              <button onClick={this.handlePush.bind(this)}>history push</button>
            </div>
          </div>
        );
  }
}

export default Bar;