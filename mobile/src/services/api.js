import Axios from 'axios';

const api = Axios.create({
    baseURL: 'http://192.168.200.103:3333',
});

export default api;
