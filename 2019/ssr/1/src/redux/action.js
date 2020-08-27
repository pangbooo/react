import { getTopList, getTopDetail } from '../api';
import { SET_TOP_LIST, SET_TOP_DETAIL,SET_CLIENT_LOAD} from './actionTypes';

export function setClientLoad(clientShouldLoad) {
  return { type: SET_CLIENT_LOAD, clientShouldLoad };
}

export function setTopList(topList) {
  return { type: SET_TOP_LIST, topList };
}

export function setTopDetail(topDetail) {
  return { type: SET_TOP_DETAIL, topDetail };
}

export function fetchTopList(){
    // dispatch由thunkMiddleware传入
    return (dispatch, getState) => {
        return getTopList().then(response => {
            const data = response.data;
            if(data.code === 0){
                dispatch(setTopList(data.data.topList));
            }
            if(process.env.REACT_ENV === 'server'){
              dispatch(setClientLoad(false))
            }
        })
        // .catch(err => 
          // 这里catch， 在server就不会catch 500 error
          // console.log('err.....',err)
        // )
    }
}

export function fetchTopDetail(id) {
    return (dispatch, getState) => {
      return getTopDetail(id).then(response => {
        const data = response.data;
        if (data.code === 0) {
          const topinfo = data.topinfo;
          const top = {
            id: topinfo.topID,
            name: topinfo.ListName,
            pic: topinfo.pic,
            info: topinfo.info
          };
          dispatch(setTopDetail(top));
        }
      });
    }
  }