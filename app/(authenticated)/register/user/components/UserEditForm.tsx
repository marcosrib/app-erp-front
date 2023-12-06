'use client'

import Select from 'react-select';
import clsx from 'clsx'
import { CheckBox } from "@/app/(authenticated)/components/checkbox";
import { Modal } from "@/app/(authenticated)/components/modal";
import { Input } from "@/app/components/input";
import { useSearchParams } from 'next/navigation'
import { Controller, useForm } from "react-hook-form";
import Button from '@/app/(authenticated)/components/button/Button';
import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { userEditSchema } from '../schemas/userEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectProfileOptionsProps, UserEditFormTypeSchema, UserEditProps } from '../types';
import { getUserById, updateUser } from '../actions/userAction';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';


type Props = {
 profile: SelectProfileOptionsProps[],
}

export default function UserEditForm({ profile }: Props) {
  const { toggleModal } = useModalStore();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  const {
    control, 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserEditFormTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(userEditSchema)
  });


  const { data: user, isError, error } = useQuery({
      queryKey: ['usersById', userId],
      queryFn: () => {
      if (userId) {
        return fetchUserById(Number(userId));
      } 
        return Promise.resolve(null);
      },
      retry: 0,
    }) 

 async function fetchUserById(id:  number) {
   return getUserById(id);
  }

console.log('ero vazio',isError, error);


 function submitUserForm(data: UserEditFormTypeSchema) {
    console.log('rjojojj');
    
    try {
      updateUser(data, user?.id);
    } catch (error) {
      toast.error('Erro ao atualizar o usuário');
    }
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
       <Controller
       name="profile"
       control={control}
       render={({ field }) => (
        <Select 
        {...field}
         isSearchable={false}
         options={profile}
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