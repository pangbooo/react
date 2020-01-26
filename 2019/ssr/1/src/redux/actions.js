import { SET_TOP_LIST, SET_TOP_DETAIL} from 'actionTypes';

export function setTopList(topList){
    return {type: SET_TOP_LIST, topList};
}

export function setTopDetail(topDetail) {
    return { type: SET_TOP_DETAIL, topDetail };
}