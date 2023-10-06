import Select from 'react-select';
import clsx from 'clsx'
import { Controller } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { Input } from "@/app/components/input";
import { FormSearch } from "../../../components/formSearch";
import Button from "../../../components/button/Button";
import { Modal } from "../../../components/modal";
import { UserFormProps } from './UserTypes';
import { useFormUser } from '../hooks/useForm';
import { useModal } from '@/app/(authenticated)/components/modal/hooks/useModal';

export default function UserForm({
    editFormData, 
    selectProfileDefaultValue 
}: UserFormProps) {

  const {register, control, errors, handleSubmit, submitUserForm, profileOptions } = useFormUser()
  const { toggleModal } = useModal() 
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
           onClick={toggleModal}
          />
         <Button color="cancel" label="Limpar"/>
        </FormSearch.Buttons>
      </FormSearch.Root>
      <Modal.Root 
       title={editFormData?.id ? 'Atualizar usuário' : 'Cadastrar usuário'}>
        <Modal.Form onSubmit={handleSubmit(submitUserForm)}>
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
          options={profileOptions}
          isSearchable={false}
          defaultValue={selectProfileDefaultValue}
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
        </Input.Root>
         </Modal.FormInputs>
         <Modal.FormFooter>
          <Button label="Atualizar" color="search" type="submit"/>
         </Modal.FormFooter>
        </Modal.Form>
      </Modal.Root>
    </>
    )
}