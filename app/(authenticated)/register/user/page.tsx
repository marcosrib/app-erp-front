import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { cookies } from 'next/headers'

export default async function Users() {
  const cookieStore = cookies()
    return (
      <>
        <UserForm />
        <UserList/>
      </>
    );
  }
  