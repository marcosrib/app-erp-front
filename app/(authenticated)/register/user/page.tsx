'use client'
import { useEffect, useRef, useState } from "react";
import { TableCustom } from "../../components/table";
import { FiEdit } from "react-icons/fi"
import { FaLock, FaUnlock } from "react-icons/fa"
import { ModalRef } from "../../components/modal/ModalRoot";

import api from "@/app/services/api";
import UserForm from "../../components/pages/users/UserForm";

import { SelectProfileOptions, ProfileProps, EditUserFormData } from "../../components/pages/users/UserTypes";




export default function Users() {
  const [ editFormData, setEditFormData] = useState<EditUserFormData | null>(null);
  const [ selectProfileOptions, setSelectOptions] = useState<SelectProfileOptions[]>([]);
  const [ profileSelectDefaultValue, setProfileSelectDefaultValue] = useState<SelectProfileOptions[]>([]);
  const modalRef = useRef<ModalRef | null>(null);

  function handleToggleModal() {  
    if(modalRef.current) {
      modalRef.current.toggleModal();
    }
  }

  function openModalEditUser(user: EditUserFormData) { 
    setEditFormData(user);
    setProfileSelectDefaultValue(user.profiles.map(profile => ({value: profile.id, label: profile.name})));
    handleToggleModal(); 
  }

  function openModalCreateUser() { 
    setEditFormData(null);
    handleToggleModal(); 
  }

  useEffect(() => {
    api.get('/api/profile/').then(response => {
      setSelectOptions(response.data.map((profile: ProfileProps ) => ({ value: profile.id, label: profile.name })))
    });
  }, []);

    return (
      <>
        <UserForm 
          selectProfileOptions={selectProfileOptions}
          selectProfileDefaultValue={profileSelectDefaultValue}
          modalRef={modalRef}
          openModalCreateUser={openModalCreateUser}
          editFormData={editFormData}
        />
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
          onClick={() => openModalEditUser(user)}
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
   
      </>
    );
  }
  