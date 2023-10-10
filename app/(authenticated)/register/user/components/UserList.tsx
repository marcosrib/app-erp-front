'use client'
import React, { useMemo } from "react";
import { TableCustom } from "@/app/(authenticated)/components/table";

import { FaLock, FaUnlock } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useUserStore } from "../store/useUserStore";
import { useModalStore } from "@/app/(authenticated)/components/modal/stores/useModalStore";


 function UserList() {
   const { addUserEdit } = useUserStore();
   const { toggleModal } = useModalStore()
   function handleUserEdit(user) {
    addUserEdit(user);
    toggleModal();
   }
      
    return (
        <TableCustom.Root>
        <TableCustom.Body url="/api/user/">
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
        return (<TableCustom.Actions>

        <TableCustom.Button 
          type="button"
          onClick={() => handleUserEdit(user)}
          label="Editar">
         <TableCustom.Icon  icon={ <FiEdit size={16}/> }/>
        </TableCustom.Button>
        <TableCustom.Button label={user.status ? 'Ativo' : 'Inativo'}>
         <TableCustom.Icon icon={user.status ? <FaUnlock color={'white'} size={16}/> : <FaLock color={'white'} size={16}/>}/>
        </TableCustom.Button>     
          </TableCustom.Actions>) 
        }}
        </TableCustom.Column>
        </TableCustom.Body>
      </TableCustom.Root>
    )
}
export default React.memo(UserList);