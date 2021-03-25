// containers/Home.js
import React from 'react';
import Header from '../../components/Header.js';

const Home = () => {
  console.log('Home...')
  return (
      <div onClick={() => {console.log('click Home')}}>
        <Header />
        Home
      </div>
  )
}

export default Home
