import axios from 'axios';
import {CHANGE_LIST} from './contants';

const changeList = (list) => ({
    type: CHANGE_LIST,
    list
})

export const getHomeList = () => {
    return (dispatch) => {
        axios.get('http://localhost:4000/getNews').then(res => {
            const list = res.data.data;
            dispatch(changeList(list));
        })
    }
}