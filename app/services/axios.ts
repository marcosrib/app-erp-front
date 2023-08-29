import axios from 'axios';
import { parseCookies } from 'nookies';

const instance = axios.create({
  baseURL: 'http://localhost:8082', 
  timeout: 10000, 
});

instance.interceptors.request.use(
  (config) => {

    const token = 'seu_token_jwt_aqui'; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;