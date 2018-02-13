import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './Header'
import Content from './Content'
import registerServiceWorker from './registerServiceWorker';
import{ createStore } from 'redux';
import { Provider } from 'react-redux'

/*function createStore (reducer) {
    let state = null;
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state; //获取state
    const dispatch = (action) => {  //修改state
        state = reducer(state, action);
        listeners.forEach((listener) => listener());//每次dispatch 之后自动执行
    };
    dispatch({}) ;// 初始化 state
    return { getState, dispatch, subscribe }
}*/

const themeReducer = (state, action) => {
    if (!state) return {
        themeColor: 'red'
    };
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, themeColor: action.themeColor };
        default:
            return state
    }
};

const store = createStore(themeReducer);

class Index extends Component{
    render(){
        return(
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
