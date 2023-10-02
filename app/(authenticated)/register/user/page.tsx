'use client'
import { useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import { FormSearch } from "../../components/formSearch";
import { Input } from "@/app/components/input";
import { TableCustom } from "../../components/table";
import { FiEdit } from "react-icons/fi"
import { MdAdd } from "react-icons/md"
import { FaLock, FaUnlock } from "react-icons/fa"
import Button from "../../components/button/Button";
import { Modal } from "../../components/modal";
import { ModalRef } from "../../components/modal/ModalRoot";



type editUserFormData = {
  id: string,
  name: string,
  email: string,
  password: string
}

const userFormSchema = z.object({
  name: z.string(),
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato do e-mail inválido'),
  password: z.string()
})

type userFormData = z.infer<typeof userFormSchema>

export default function Users() {
  const [ editFormData, setEditFormData] = useState<editUserFormData | null>(null)
  const modalRef = useRef<ModalRef | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
  })

  function handleToggleModal() {  
    if(modalRef.current) {
      modalRef.current.toggleModal();
    }
  }

  function handleSubmitUser(user: userFormData) {
      if(editFormData?.id) {
        return handleEditUser(user);
        
      }
      handleCreateUser(user);
  }

  function openModalEditUser(user: editUserFormData) { 
    toast.error('Erro ao autualizar usuário')
    setEditFormData(user);
    handleToggleModal(); 
  }

  function openModalCreateUser() { 
    setEditFormData(null);
    handleToggleModal(); 
  }

  function handleCreateUser(user: userFormData) {
  
  }
  
  function handleEditUser(user: userFormData) {
    console.log(editFormData?.id);
  }
   
 
    return (
      <>
      <FormSearch.Root>
        <FormSearch.InputContainer>
            <Input.Root>
              <Input.Label label="E-mail"/>
              <Input.Input />
            </Input.Root>
        </FormSearch.InputContainer>
        <FormSearch.Buttons>
         <Button 
           icon={<MdAdd size={16} />}
           color="search" 
           label="Adicionar"
           onClick={openModalCreateUser}
          />
         <Button color="cancel" label="Limpar"/>
        </FormSearch.Buttons>
      </FormSearch.Root>
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
         <TableCustom.Icon icon={status ? <FaUnlock color={'white'} size={16}/> : <FaLock color={'white'} size={16}/>}/>
        </TableCustom.Button>     
          </TableCustom.Actions>) 
        }}
        </TableCustom.Column>
      
        </TableCustom.Body>
      </TableCustom.Root>
      <Modal.Root 
       ref={modalRef}
       title={editFormData?.id ? 'Atualizar usuário' : 'Cadastrar usuário'}>
        <Modal.Form onSubmit={handleSubmit(handleEditUser)}>
          <Modal.FormInputs>
         <Input.Root>
         <Input.Label label="Nome" />
         <Input.Input 
          {...register('name')}
         defaultValue={editFormData?.name} />
          <Input.LabelError 
              helperText={errors.name?.message}
            />
         </Input.Root>
         <Input.Root>
         <Input.Label label="E-mail"/>
         <Input.Input  
             {...register('email')}
            defaultValue={editFormData?.email}/>
             <Input.LabelError 
              helperText={errors.email?.message}
            />
         </Input.Root>
         <Input.Root>
         <Input.Label 
          label="Password" />
         <Input.Input  
         {...register('password')}
         />
          <Input.LabelError 
              helperText={errors.password?.message}
            />
         </Input.Root>
         </Modal.FormInputs>
         <Modal.FormFooter>
          <Button label="Atualizar" color="search" type="submit"/>
         </Modal.FormFooter>
        </Modal.Form>
      </Modal.Root>
      </>
    );
  }
  