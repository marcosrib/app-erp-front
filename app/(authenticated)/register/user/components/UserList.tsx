import { TableCustom } from "@/app/(authenticated)/components/table";
import { ParamsProps } from "../types";
import ButtonActive from "./ButtonActive";
import ButtonEdit from "./ButtonEdit";
import UserSearch from "./UserSearch";
import { hasPermission } from "@/app/(authenticated)/actions/hasPermission";

export default async function UserList({ searchParams} : ParamsProps) {
  const isPermissionUpdate = await hasPermission('USER', 'UPDATE');

    return ( 
      <>
        <UserSearch searchParams={searchParams}/> 
        <TableCustom.Root>
        <TableCustom.Body
         url="api/user/" 
         params={searchParams}
        >
        <TableCustom.Header>
          <TableCustom.HeaderContent title= 'Id'/>
          <TableCustom.HeaderContent title= 'Nome'/>
          <TableCustom.HeaderContent title= 'Email'/>
          <TableCustom.HeaderContent title= 'Perfil'/>
          <TableCustom.HeaderContent title= 'Ações'/>
        </TableCustom.Header>
        <TableCustom.Column field="id">
        {(field) => {

          return <p>{field}</p>;
        }}
        </TableCustom.Column>
        <TableCustom.Column field="name">
        {(field) => {
          
          return <p>{field}</p>;
        }}
        </TableCustom.Column>
        <TableCustom.Column field="email">
        {(field) => {
          
          return <p>{field}</p>;
        }}
        </TableCustom.Column>
        <TableCustom.Column field="combinedData">
        {(field) => {
          return <p>{JSON.parse(field).profiles[0]?.name}</p>;
        }}
        </TableCustom.Column>
        <TableCustom.Column field="actions">
        {(row) => {
          let user = JSON.parse(row);
        return (
          <TableCustom.Actions>
        {isPermissionUpdate && (
          <>
            <ButtonEdit user={user}/>
            <ButtonActive data={user} page={searchParams?.page} />
          </>
        )}
        </TableCustom.Actions>
        ) 
        }}
        </TableCustom.Column>
        </TableCustom.Body>
      </TableCustom.Root>
      </>
    )
}
