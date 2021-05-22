// containers/Home.js
import React from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

const Header = (props) => {
  return (
      <div>
        <Link to='/'>首页</Link>
        <br />
        {
          props.isLogin ?
          <Link to='/logout'>退出</Link> :
          <Link to='/login'>登陆</Link>
        }
      </div>
  )
}

const mapStateToProps = (state) => ({
  isLogin: state.header.isLogin
})

export default connect(mapStateToProps, null)(Header)
