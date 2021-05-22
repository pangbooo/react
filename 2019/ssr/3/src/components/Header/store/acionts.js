import {CHANGE_LOGIN} from './constance.js'

export const changeLogin = (value) => ({
    type: CHANGE_LOGIN,
    payload: value
})

export const getHeaderInfo = () => {
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/api/isLogin').then(res => {
            dispatch(changeLogin(res.data.data.login))
        })
    }
}