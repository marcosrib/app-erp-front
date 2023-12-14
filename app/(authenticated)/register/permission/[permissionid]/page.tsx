'use client'

import Button from "@/app/(authenticated)/components/button/Button";
import { Form } from "@/app/(authenticated)/components/form";
import { Input } from "@/app/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { UserSearchDataProps } from "../../user/types";
import { userSerachSchema } from "../../user/hooks/schema";
import TextArea from "@/app/(authenticated)/components/textarea/TextArea";


export default function permissionEdit() {
   const { 
      register: registerSearch,
      handleSubmit,
      setValue,
      reset,
      formState: { errors }
    } = useForm<UserSearchDataProps>({
      mode: 'onBlur',
      resolver: zodResolver(userSerachSchema)
    })
   function handleUpdadePerrmissionSubmit() {

    }
 return (
   <Form.Root title="Editar permissões" onSubmit={handleSubmit(handleUpdadePerrmissionSubmit)}>
   <Form.InputContainer>
       <Input.Root>
         <Input.Label label="Nome"/>
         <Input.Input {...registerSearch('email')} />
         <Input.LabelError 
         helperText={errors.email?.message}
       />
       </Input.Root>
       <TextArea label="Descrição"/>
   </Form.InputContainer>
   <Form.Buttons>
    <Button 
      type='button'
      icon={<MdAdd size={16} />}
      color="add" 
      label="Adicionar"
      onClick={()=> null}
     />
    
   </Form.Buttons>
 </Form.Root>
 )
}