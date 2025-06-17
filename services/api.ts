import axios from 'axios';

const api = axios.create({
  baseURL: 'http://SEU_IP_LOCAL:8000/api/',
});

export default api;