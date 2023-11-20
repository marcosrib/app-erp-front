import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { getLocalToken, createLocalToken } from "@/app/services/cookies/localTokenService";



export default async function Users() {
   //await createLocalToken({token: 'marcos', refreshToken: 'rklklklklçk'});
   const { token , refreshToken} = await getLocalToken();
   console.log('kejrkjer')
    console.log(token)
    console.log('kejrkjer')
   // console.log(refreshToken);
  
   
  
   
    
    return (
      <>
        <UserForm />
        <UserList/>
      </>
    );
  }
  