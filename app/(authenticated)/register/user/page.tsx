import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { ParamsProps } from './types'

export default async function Users({searchParams}: ParamsProps) {

    return (
      <>
        <UserForm/>
        <UserList searchParams={searchParams}/>
      </>
    );
  }
  