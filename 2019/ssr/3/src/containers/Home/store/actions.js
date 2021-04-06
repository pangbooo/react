import axios from 'axios';
import {CHANGE_LIST} from './contants';

const changeList = (list) => ({
    type: CHANGE_LIST,
    list
})

export const getHomeList = (server) => {
    let url = '';
    if(server){
        url = 'http://localhost:4000/api/getNews'
    }else{
        url = '/api/getNews'
    }
    return (dispatch) => {
        return axios.get(url).then(res => {
            const list = res.data.data;
            dispatch(changeList(list));
        })
    }
}