import axios from 'axios';

const create = axios.create({
    baseURL: 'http://localhost:4000'
})

export default create
