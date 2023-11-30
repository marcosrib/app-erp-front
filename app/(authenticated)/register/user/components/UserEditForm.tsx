'use client'

import Select from 'react-select';
import clsx from 'clsx'
import { CheckBox } from "@/app/(authenticated)/components/checkbox";
import { Modal } from "@/app/(authenticated)/components/modal";
import { TableCustom } from "@/app/(authenticated)/components/table";
import { Input } from "@/app/components/input";
import { FiEdit } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";
import Button from '@/app/(authenticated)/components/button/Button';
import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { userEditSchema } from '../schemas/userEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectProfileOptionsProps, UserEditFormTypeSchema } from '../types';


type Props = {
 profiles: SelectProfileOptionsProps[]
}

export default function UserEditForm({ profiles }: Props) {

  const { toggleModal } = useModalStore();
  
  const {
    control, 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserEditFormTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(userEditSchema)
  })

  console.log(profiles);
  
   function submitUserForm(data: UserEditFormTypeSchema) {
    console.log(data);
    
   }

    return (
      <>
      <Modal.Root 
       title={'Editar Usuário'}>
        
       <Modal.Form onSubmit={handleSubmit(submitUserForm)}>
         <Modal.FormInputs>
        
        <Input.Root>
        <Input.Label label="Nome" />
        <Input.Input 
         {...register('name')}
        />
         <Input.LabelError 
             helperText={errors.name?.message}
           />
        </Input.Root>
        <Input.Root>
        <Input.Label label="E-mail"/>
        <Input.Input
           {...register('email')}
           />
            <Input.LabelError 
             helperText={errors.email?.message}
           />
        </Input.Root>
        <Input.Root>
        <Input.Label 
         label="Senha" />
        <Input.Input  
        {...register('password')}
        />
         <Input.LabelError 
             helperText={errors.password?.message}
           />
        </Input.Root>
        <Input.Root>
        <Input.Label 
         label="Perfis" />
       <Controller
       name="profile"
       control={control}
       render={({ field }) => (
        <Select 
        {...field}
         isSearchable={false}
         options={profiles}
         classNames={{
           control: (state) =>
           clsx(
             state.isFocused ? '!border-indigo-600 !outline-none !shadow-none' : '!border-gray-300',
             'p-0.5 !rounded-lg'
           )
         }} 
       />
       )}
     />
      <Input.LabelError 
         helperText={errors.profile?.value?.message}
       />
       </Input.Root>
       <Input.Root>
       <Controller
         name="status"
         control={control}
         defaultValue={false}
         render={({ field: { value, onChange } }) => (
       <CheckBox 
         name="status"
         value={value}
         onChange={onChange}
         label='Status'
        />
       )}
       />
       </Input.Root>
        </Modal.FormInputs>
        <Modal.FormFooter>
         <Button label={'Atualizar'} color="search" type="submit"/>
        </Modal.FormFooter>
       </Modal.Form>
     </Modal.Root>
        <TableCustom.Button 
        type="button"
        onClick={() => toggleModal()} 
        color="edit">
       <TableCustom.Icon  icon={ <FiEdit
        color={'white'}  size={16}/> }/>
      </TableCustom.Button>
      </>
    )
}