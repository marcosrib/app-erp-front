import apiInstance from "@/app/services/api";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { cookies } from 'next/headers'

export default async function Users() {
  const cookieStore = cookies()
  
  /// console.log(cookies().get('erp.token'));
 
  
   //const api = apiInstance(cookieStore.get);
   //api.get('/api/profiles').then(response => console.log(response.data))
    return (
      <>
        <UserForm />
        <UserList/>
      </>
    );
  }
  