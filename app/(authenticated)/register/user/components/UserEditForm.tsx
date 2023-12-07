'use client'

import { CheckBox } from "@/app/(authenticated)/components/checkbox";
import { Modal } from "@/app/(authenticated)/components/modal";
import { Input } from "@/app/components/input";
import { Controller, useForm } from "react-hook-form";
import Button from '@/app/(authenticated)/components/button/Button';
import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { userEditSchema } from '../schemas/userEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectProfileOptionsProps, UserEditFormTypeSchema} from '../types';
import { toast } from 'react-toastify';
import CustomSelect from '@/app/(authenticated)/components/select/CustomSelect';
import { useUserStore } from '../store/useUserStore';
import { useEffect } from 'react';
import { updateUser } from "../actions/userAction";


type Props = {
 profile: SelectProfileOptionsProps[],
}

export default function UserEditForm({ profile }: Props) {
  const {toggleModal} = useModalStore();
  const { userEdit: user } = useUserStore();

  const {
    control, 
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UserEditFormTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(userEditSchema)
  });


console.log('ero vazio', user);


 function submitUserForm(data: UserEditFormTypeSchema) {
    try {
      updateUser(data, user.id);
      toggleModal();
    } catch (error) {
      toast.error('Erro ao atualizar o usuário');
    }
  }

  useEffect(() => {  
    setValue('name', user.name)
    setValue('email', user.email)
    setValue('status', user.status)
    if (user?.profiles && user.profiles.length > 0) {
      setValue('profile', {
          value: user.profiles[0]?.id,
          label: user.profiles[0]?.name
      })
    } else {
      setValue('profile', { value: 0 , label: ''})
    }
 })
  
    return (
      <>
      <Modal.Root 
       title={'Editar Usuário'}>
        
       <Modal.Form onSubmit={handleSubmit(submitUserForm)}>
         <Modal.FormInputs>
        
        <Input.Root>
        <Input.Label label="Nome" />
        <Input.Input 
         defaultValue={user?.name}
         {...register('name')}
        />
         <Input.LabelError 
             helperText={errors.name?.message}
           />
        </Input.Root>
        <Input.Root>
        <Input.Label label="E-mail"/>
        <Input.Input
           defaultValue={user?.email}
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
        <CustomSelect   
        name='profile'
        options={profile}
        control={control}
        />
      <Input.LabelError 
         helperText={errors.profile?.value?.message}
       />
       </Input.Root>
       <Input.Root>
       <Controller
         name="status"
         defaultValue={user?.status}
         control={control}
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
       
      </>
    )
}