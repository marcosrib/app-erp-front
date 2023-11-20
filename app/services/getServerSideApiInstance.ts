import { cookies } from 'next/headers'; 
import apiInstance from './api';
export const getServerSideApiInstance = () => {
    const nextCookies = cookies();
    const token = nextCookies.get('erp.token')?.value;    
 
   
    return apiInstance(token);
   };