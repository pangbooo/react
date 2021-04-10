// containers/Home.js
import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { getHomeList } from './store/actions';

class Home extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    if(!this.props.newsList.length){
      this.props.getHomeList()
    }
  }

  getHomeList(){
    return(
      this.props.newsList.map(item => (
        <div key={item.id}>{item.title}</div>
      ))
    )
  }
  
  render(){
    return (
            <div onClick={() => {console.log('click Home')}}>
              Hello, {this.props.name}
               {this.getHomeList()}
            </div>
        )
  }
}

Home.loadData = (store) => {
  //服务端渲染前，获取异步数据
  return store.dispatch(getHomeList())
}

const mapStateToProps  = (state) => ({
  name: state.home.name,
  newsList: state.home.newsList
});

const mapDispatchToProps = dispatch => ({
  getHomeList(){
    dispatch(getHomeList())
  }
})

export default connect(mapStateToProps , mapDispatchToProps)(Home)

