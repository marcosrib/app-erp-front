import React from "react";
import { TableCustom } from "@/app/(authenticated)/components/table";
import { ParamsProps, UserEditProps } from "../types";
import ButtonActive from "./ButtonActive";
import { getProfiles } from "../actions/userAction";
import UserEditForm from "./UserEditForm";
import ButtonEdit from "./ButtonEdit";

export default async function UserList({ searchParams} : ParamsProps) {

    const profile = await getProfiles();
    console.log(profile);
    
    
    const handleDeliteUser = async (data: UserEditProps )=> {
      'use server'
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
          <ButtonEdit user={user}/>
          <ButtonActive status={user.status} />
        </TableCustom.Actions>) 
        }}
        </TableCustom.Column>
        </TableCustom.Body>
      </TableCustom.Root>
      <UserEditForm profile={profile}  />
      </>
    )
}
