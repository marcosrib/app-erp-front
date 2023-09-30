'use client'
import { FormSearch } from "../../components/formSearch";
import { Input } from "@/app/components/input";
import { TableCustom } from "../../components/table";
import { FiEdit } from "react-icons/fi"
import { MdAdd } from "react-icons/md"
import { FaLock, FaUnlock } from "react-icons/fa"
import Button from "../../components/button/Button";
import { Modal } from "../../components/modal";
import { useRef } from "react";
import { ModalRef } from "../../components/modal/ModalRoot";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const createUserFormSchema = z.object({
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato do e-mail inválido'),
  password: z.string()
    .min(6, 'A senha precisa de no minimo 6 caracteres')
})
type CreateUserFormData = z.infer<typeof createUserFormSchema>
export default function Users() {

  const modalRef = useRef<ModalRef | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),

  })

  function handleToggleModal() {
    if(modalRef.current) {
      modalRef.current.toggleModal();
    }
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
         <Button icon={<MdAdd size={16} />} color="search" label="Adicionar"/>
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
          let status = JSON.parse(row).status;
        return (<TableCustom.Actions>

        <TableCustom.Button label="Editar">
         <TableCustom.Icon  icon={ <FiEdit size={16}/> }/>
        </TableCustom.Button>
        <TableCustom.Button 
        onClick={handleToggleModal}
        label={status ? 'Ativo' : 'Inativo'}>
         <TableCustom.Icon icon={status ? <FaUnlock color={'white'} size={16}/> : <FaLock color={'white'} size={16}/>}/>
        </TableCustom.Button>     
          </TableCustom.Actions>) 
        }}
        </TableCustom.Column>
      
        </TableCustom.Body>
      </TableCustom.Root>
      <Modal.Root 
       ref={modalRef}
       title="Cadastrar usuário">
        <Modal.Form>
         <Input.Root>
         <Input.Label label="nome" />
         <Input.Input defaultValue={''} />
         </Input.Root>
         <Input.Root>
         <Input.Label label="nome" />
         <Input.Input />
         </Input.Root>
         <Input.Root>
         <Input.Label label="nome" />
         <Input.Input />
         </Input.Root>
         <Input.Root>
         <Input.Label label="nome" />
         <Input.Input />
         </Input.Root>
        </Modal.Form>
        <Modal.Footer>
          <Button color="search" label="Salvar" />
        </Modal.Footer>
      </Modal.Root>
      </>
    );
  }
  