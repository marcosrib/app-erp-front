import Select from 'react-select';
import clsx from 'clsx'
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdAdd } from "react-icons/md";
import { Input } from "@/app/components/input";
import { FormSearch } from "../../formSearch";
import Button from "../../button/Button";
import { Modal } from "../../modal";
import { UserFormProps, submitUserFormDataProps } from './UserTypes';
import api from '@/app/services/api';
import { toast } from 'react-toastify';

const profileSchema = z.object({
    value: z.number(),
    label: z.string(),
  });
  
const userFormSchema = z.object({
    name: z.string(),
    email: z.string()
      .nonempty('O e-mail é obrigatório')
      .email('Formato do e-mail inválido'),
    password: z.string(),
    profile: profileSchema
})
  
type userFormData = z.infer<typeof userFormSchema>

export default function UserForm({
    openModalCreateUser, 
    modalRef, 
    editFormData, 
    selectProfileOptions,
    selectProfileDefaultValue 
}: UserFormProps) {
    
    const {
        control, 
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<userFormData>({
        resolver: zodResolver(userFormSchema),
      })
    
    function handleCreateUser(user: submitUserFormDataProps) {
        api.post('/api/user/', user)
        .then(response => {
            modalRef.current?.toggleModal()
        })
        .catch(error => {
            console.log(error);
            
            toast.error(error.response.data.message);
        });
    }
      
    function handleEditUser(user: submitUserFormDataProps) {
        console.log(editFormData?.id);
    }
    
    function submitUser(user: userFormData) {

        const { profile, ...userWithoutProfile } = user;
        const renamedProfile = {
            id: profile.value,
            name: profile.label,
          };
        
        const userWithProfilesArray = {
          ...userWithoutProfile,
          profiles: [renamedProfile],
        };

      if(editFormData?.id) {
            return handleEditUser(userWithProfilesArray);
        }
        handleCreateUser(userWithProfilesArray);
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
      <Modal.Root 
       ref={modalRef}
       title={editFormData?.id ? 'Atualizar usuário' : 'Cadastrar usuário'}>
        <Modal.Form onSubmit={handleSubmit(submitUser)}>
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
          options={selectProfileOptions}
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