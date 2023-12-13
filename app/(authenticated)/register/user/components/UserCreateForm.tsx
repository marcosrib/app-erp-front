'use client'
import Select from 'react-select';
import clsx from 'clsx'
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/app/components/input";
import Button from "../../../components/button/Button";
import { Modal } from "../../../components/modal";
import { CheckBox } from '@/app/(authenticated)/components/checkbox';
import { SelectProfileOptionsProps, UserCreateTypeSchema } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { userCreateSchema } from '../schemas/userCreateSchema';
import { createUser } from '../actions/userAction';
import { useModalStore } from '@/app/(authenticated)/components/modal/stores/useModalStore';
import { toast } from 'react-toastify';

type Props = {
  profile: SelectProfileOptionsProps[] | undefined,
}

export default function UserCreateForm({profile}: Props) {
  const { toggleModal } = useModalStore();
  const {
    control, 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserCreateTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(userCreateSchema)
  });

    async function submitUserForm(data: UserCreateTypeSchema) {

       const userResult = await createUser(data);
       if(userResult.status !== 201) {
        toast.error(userResult.message);
        return
       }
       toggleModal();
       toast.success(userResult.message);
    }
    return (
        <>
      <Modal.Root 
       title={'Cadastrar Usuário'}>
         
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
          <Button label={'Cadastrar'} color="search" type="submit"/>
         </Modal.FormFooter>
        </Modal.Form>
          </Modal.Root> 
    </> 
    )
}