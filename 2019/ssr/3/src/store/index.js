import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk'
import { reducer as homeReducer } from '../containers/Home/store';
import { reducer as headerReducer } from '../components/Header/store';
import clientAxios from '../client/request'
import serverAxios from '../server/request'
const reducer = combineReducers({
    home: homeReducer,
    header: headerReducer
});

//（这样只是生成了一个单例store，多个用户使用了相同的store，造成bug）
// const store = createStore(reducer,applyMiddleware(thunk));
export const getStore = () => {
    return createStore(reducer,applyMiddleware(thunk.withExtraArgument(serverAxios)));
}

export const getClientStore = () => {
    const defaultState = window.context.state;
    return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));

}
