import React from 'react';
import ReactDom  from "react-dom";
import { Provider } from 'react-redux'
import App from './main';
import reducer from './reducers/index'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'

// 通过服务端注入的全局变量得到初始 state
const preloadedState = window.__PRELOADED_STATE__

// 使用初始 state 创建 Redux store
const store = createStore(reducer, preloadedState);
ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
