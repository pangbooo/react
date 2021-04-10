import axios from 'axios';
import {CHANGE_LIST} from './contants';
import clientAxios from '../../../client/request'
import serverAxios from '../../../server/request'

const changeList = (list) => ({
    type: CHANGE_LIST,
    list
})

export const getHomeList = (server) => {
    let  request = server ? serverAxios : clientAxios
    return (dispatch) => {
        return request.get('/api/getNews').then(res => {
            const list = res.data.data;
            dispatch(changeList(list));
        })
    }
}