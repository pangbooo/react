// containers/Home.js
import React from 'react';
import Header from '../../components/Header.js';
import {connect} from 'react-redux';

const Home = (props) => {
  console.log('Home...')
  return (
      <div onClick={() => {console.log('click Home')}}>
        <Header />
        Hello, {props.name}
      </div>
  )
}

const mapStateToProps  = (state) => ({
  name: state.name
});

export default connect(mapStateToProps , null)(Home)

