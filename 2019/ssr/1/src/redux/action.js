import { getTopList, getTopDetail } from '../api';

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
    //// dispatch由thunkMiddleware传入
    return (dispatch, getState) => {
        return getTopList().then(response => {
            const data = response.data;
            if(data.code === 0){
                dispatch(setTopList(data.data.topList));
            }
        })
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