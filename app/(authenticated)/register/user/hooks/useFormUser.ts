
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema } from "./schema";
import { useModalStore } from "@/app/(authenticated)/components/modal/stores/useModalStore";
import { submitUserFormDataProps, ProfileProps, SelectProfileOptionsProps, UserFormData } from "./types";
import apiInstance from "@/app/services/api";


export function useFormUser() {
    const { userEdit, addUserEdit } = useUserStore();
    const { toggleModal } = useModalStore();
    const queryClient = useQueryClient(); 
    const api = apiInstance();
    const {
        control, 
        register,
        handleSubmit,
        setValue,
        formState: { errors }
      } = useForm<UserFormData>({
        mode: 'onBlur',
        resolver: zodResolver(userFormSchema)
      })
  
      const mutation = useMutation((user: submitUserFormDataProps) => {
        return api.post('/api/user/', user);
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(['table']);
          queryClient.fetchQuery(['table', 1])
          toggleModal();
          toast.success('Usuário criado com sucesso');
        },
        onError: (error) => {
          toast.error('Ocorreu um erro ao criar o usuário');
        },
      });
    
    const { data: profiles } = useQuery({
      queryKey: ['userFormProfile'],
      queryFn: () => fetchProfiles(),
    })

    const fetchProfiles = async (): Promise<SelectProfileOptionsProps[]> => {
     const profilesResponse = await api.get('/api/profile/');
      return profilesResponse.data.map((profile: ProfileProps) => ({
        value: profile.id,
        label: profile.name,
      }));
    };
   

      useEffect(() => {  
        setValue('name', userEdit.name)
        setValue('email', userEdit.email)
        if (userEdit?.profiles && userEdit.profiles.length > 0) {
          setValue('profile', {
              value: userEdit.profiles[0]?.id,
              label: userEdit.profiles[0]?.name
          })
        } else {
          setValue('profile', { value: 0 , label: ''})
        }
     },[userEdit])
      
      
    function handleEditUser(user: submitUserFormDataProps) {
       // console.log(editFormData?.id);
    }
    
    function submitUserForm(user: UserFormData) {
      console.log(user);
      
        const { profile, ...userWithoutProfile } = user;
        const renamedProfile = {
            id: profile.value,
            name: profile.label,
          };
        
        const userWithProfilesArray = {
          ...userWithoutProfile,
          profiles: [renamedProfile],
        };
  
      if(userEdit?.id) {
          return ;
      }
      mutation.mutate(userWithProfilesArray);
    }  
    

   function openModal() {
      addUserEdit({
        id: '',
        email: '',
        name: '',
        password: '',
        profiles: []      
      });
      toggleModal();
    }

    return {
        control, 
        register,
        errors,
        handleSubmit,
        submitUserForm,
        profiles,
        openModal
    }
}