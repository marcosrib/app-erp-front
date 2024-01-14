import { redirect } from "next/navigation";
import { hasPermission } from "../../actions/hasPermission";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { ParamsProps } from './types'

export default async function Users({searchParams}: ParamsProps) {
  const isPermission = await hasPermission('USER', 'READ');
  if(!isPermission) {
    redirect('/unauthorized');
  }
    return (
      <>
        <UserForm/>
        <UserList searchParams={searchParams}/>
      </>
    );
  }
  