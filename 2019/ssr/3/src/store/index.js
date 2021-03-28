import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk'
import { reducer as homeReducer } from '../containers/Home/store';

const reducer = combineReducers({
    home: homeReducer
});

//（这样只是生成了一个单例store，多个用户使用了相同的store，造成bug）
// const store = createStore(reducer,applyMiddleware(thunk));
const getStore = () => {
    return createStore(reducer,applyMiddleware(thunk));
}

export default getStore