'use client'
import Select from 'react-select';
import clsx from 'clsx'
import { Controller } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { Input } from "@/app/components/input";
import { FormSearch } from "../../../components/formSearch";
import Button from "../../../components/button/Button";
import { Modal } from "../../../components/modal";
import { useFormUser } from '../hooks/useFormUser';
import { CheckBox } from '@/app/(authenticated)/components/checkbox';
import { userSerachSchema } from '../hooks/schema';
import { useUserSerach } from '../hooks/useUserSerach';


export default function UserForm() {

  const {
    register,
    control, 
    errors, 
    profiles, 
    isEdit, 
    handleSubmit, 
    submitUserForm, 
    openModal } = useFormUser();

    const { handleSearchSubmit, handleAddfilters, registerSearch, searchErrros } = useUserSerach();

    return (
        <>
        <FormSearch.Root  onSubmit={handleSearchSubmit(handleAddfilters)}>
        <FormSearch.InputContainer>
            <Input.Root>
              <Input.Label label="E-mail"/>
              <Input.Input {...registerSearch('email')} />
              <Input.LabelError 
              helperText={searchErrros.email?.message}
            />
            </Input.Root>
        </FormSearch.InputContainer>
        <FormSearch.Buttons>
        <Button
           type='submit' 
           color="cancel" 
           label="Pesquisar"
          />
         <Button 
           type='button'
           icon={<MdAdd size={16} />}
           color="search" 
           label="Adicionar"
           onClick={() => openModal()}
          />
         <Button
           type='button' 
           color="cancel" 
           label="Limpar"
          />
        </FormSearch.Buttons>
      </FormSearch.Root>
      <Modal.Root 
       title={isEdit ? 'Editar Usuário' : 'Cadastrar Usuário'}>
         
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
          <Button label={isEdit ? 'Atualizar' : 'Cadastrar'} color="search" type="submit"/>
         </Modal.FormFooter>
        </Modal.Form>
      </Modal.Root>
    </>
    )
}