import axios from 'axios';

export const getHomeList = () => {
    return () => {
        axios.get('http://localhost:4000/getNews').then(res => {
            console.log(res)
        })
    }
}