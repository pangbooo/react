// containers/Home.js
import React, { useEffect } from 'react';
import Header from '../../components/Header.js';
import {connect} from 'react-redux';
import { getHomeList } from './store/actions';

const Home = (props) => {
  useEffect(() => {
    props.getHomeList()
  });

  return (
      <div onClick={() => {console.log('click Home')}}>
        <Header />
        Hello, {props.name}
          {
            props.newsList.map(item => (
              <div key={item.id}>{item.title}</div>
            ))
          }
      </div>
  )
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

