import axios from 'axios';
import { parseCookies } from 'nookies';

const instance = axios.create({
  baseURL: 'http://localhost:8081', 
  timeout: 10000, 
});

instance.interceptors.request.use(
  (config) => {

    const {'erp.token': token} = parseCookies(); 
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