import { parseCookies } from 'nookies';
import apiInstance from './api';
export const getClientSideApiInstance =  () => {
    const cookies = parseCookies(); 
    const { 'erp.token': token } = cookies;
    console.log(token);
    
    return apiInstance(token);
   };