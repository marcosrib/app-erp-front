import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const api = axios.create({
  baseURL: 'http://localhost:8082',
  timeout: 10000,
});

let isRetryRefreshToken = false; 

api.interceptors.response.use(
  function (config) {
    const { 'erp.token': token } = parseCookies();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async function (error) {

    if(isRetryRefreshToken) {
      destroyCookie(undefined, 'erp.token');
      destroyCookie(undefined, 'erp.refreshtoken');
      window.location.href = '/login';
      return Promise.reject(error);
    }
    const { 'erp.token': access_token } = parseCookies();
    const originalRequest = error.config;
    if (error.response?.status === 401 && access_token) {
        isRetryRefreshToken = true
        const { 'erp.refreshtoken': refreshToken } = parseCookies();
        const parameters = {
          method: 'POST',
        };
        const body = {
          refreshToken,
        };
        const response = await api.post('/auth/refresh/', body, parameters);

        setCookie(undefined, 'erp.token', response.data.accessToken, {
          maxAge: 60 * 60 * 1, // 1 hora
        });
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;