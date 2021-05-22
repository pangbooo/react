import {CHANGE_LOGIN} from './constance.js'

const defaultStatus = {
    isLogin: false
}

export default (state = defaultStatus, action) => {
    switch (action.type){
        case CHANGE_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            }
        default:
            return state;
    }
}