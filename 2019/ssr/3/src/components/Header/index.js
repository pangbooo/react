// containers/Home.js
import React from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {actions} from './store'

const Header = (props) => {
  return (
      <div>
        <Link to='/'>首页</Link>
        <br />
        {
          props.isLogin ?
          <div onClick={props.handleLogout}>退出</div> :
          <div onClick={props.handleLogin}>登陆</div>
        }
      </div>
  )
}

const mapStateToProps = (state) => ({
  isLogin: state.header.isLogin
})

const mapDispatchToProps = (dispatch) => ({
  handleLogin: () => {
    dispatch(actions.login())
  },
  handleLogout: () => {
    dispatch(actions.logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
