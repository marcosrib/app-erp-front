import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const apiInstance = () =>   {
  const cookies = parseCookies(); 
  const { 'erp.token': token } = cookies;
  
const apiConfig = {
  baseURL: 'http://localhost:8082',
  timeout: 10000,
  headers: {},
};

if (token) {
  apiConfig.headers = {
    Authorization: `Bearer ${token}`,
  };
}

const api = axios.create(apiConfig);

let isRetryRefreshToken = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {

    if (error.response?.status === 401 && isRetryRefreshToken) {
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

      setCookie(undefined , 'erp.token', response.data.accessToken, {
        maxAge: 60 * 60 * 1, // 1 hora
      });
      originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return axios(originalRequest);
    }
    isRetryRefreshToken = false;
    return Promise.reject(error);
  }
);

return api;
}
export default apiInstance