import React from "react";
import { TableCustom } from "@/app/(authenticated)/components/table";
import ButtonEdit from "./ButtonEdit";
import { ParamsProps } from "../types";


export default async function UserList({ searchParams } : ParamsProps) {

   /*const { addUserEdit } = useUserStore();
   const { toggleModal } = useModalStore();
   const { updateSatus } = useFormUser();

   function handleUserEdit(user : UserDataProps) {
    addUserEdit(user);
    toggleModal();
   }*/


   
      
    return (
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
          <TableCustom.HeaderContent title= 'actions'/>
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
          <ButtonEdit />  
        </TableCustom.Actions>) 
        }}
        </TableCustom.Column>
        </TableCustom.Body>
      </TableCustom.Root>
    )
}
