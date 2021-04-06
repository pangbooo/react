// containers/Home.js
import React, { useEffect } from 'react';
import Header from '../../components/Header.js';
import {connect} from 'react-redux';
import { getHomeList } from './store/actions';

// const Home = (props) => {
//   useEffect(() => {
//     props.getHomeList()
//   });

//   return (
//       <div onClick={() => {console.log('click Home')}}>
//         <Header />
//         Hello, {props.name}
//           {
//             props.newsList.map(item => (
//               <div key={item.id}>{item.title}</div>
//             ))
//           }
//       </div>
//   )
// }

class Home extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    if(!this.props.newsList.length){
      this.props.getHomeList(false)
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
              <Header />
              Hello, {this.props.name}
               {this.getHomeList()}
            </div>
        )
  }
}

Home.loadData = (store) => {
  //服务端渲染前，获取异步数据
  return store.dispatch(getHomeList(true))
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

