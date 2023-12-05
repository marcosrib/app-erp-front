import React from "react";
import { TableCustom } from "@/app/(authenticated)/components/table";

import { ParamsProps } from "../types";
import ButtonActive from "./ButtonActive";
import { getProfiles } from "../actions/userAction";
import ButtonEdit from "./ButtonEdit";
import UserEditForm from "./UserEditForm";

export default async function UserList({ searchParams } : ParamsProps) {

    const profile = await getProfiles();
    
    async function teste(data: FormData) {
      'use server'
     console.log('daa',data);
     
    }

    return ( 
      <>
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
     
        <ButtonEdit id={user.id}/>
     
          <ButtonActive status={user.status} />
        </TableCustom.Actions>) 
        }}
        </TableCustom.Column>
        </TableCustom.Body>
      </TableCustom.Root>
      <UserEditForm profile={profile} />
      </>
    )
}
