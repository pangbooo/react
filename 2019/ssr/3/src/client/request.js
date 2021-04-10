import axios from 'axios';

const create = axios.create({
    baseURL: '/'
});

export default create