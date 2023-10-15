
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema } from "./schema";
import { useModalStore } from "@/app/(authenticated)/components/modal/stores/useModalStore";
import { UserDataProps, ProfileProps, SelectProfileOptionsProps, UserFormData } from "../types";
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
  
      const mutation = useMutation((user: UserDataProps) => {
        return api.post('/api/user/', user);
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(['table']);
          queryClient.fetchQuery(['table', 1])
          toggleModal();
          toast.success('Usuário criado com sucesso');
        },
        onError: (error: any) => {         
          toast.error(error.response.data.message);
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
        setIdValueInSchema();
     },[userEdit])
      
      
    function handleEditUser(user: UserDataProps) {
    
    }
    
    function submitUserForm(user: UserFormData) {     
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
        handleEditUser(userWithProfilesArray);
          return ;
      }
      mutation.mutate(userWithProfilesArray);
    }  

    function setIdValueInSchema() {
      if(userEdit.id !== undefined ) {
        setValue('id', userEdit.id);
        setValue('password', '');
      }
    }

   function openModal() {
    setValue('id', undefined);
      addUserEdit({
        'id': undefined,
        email: '',
        name: '',
        password: '',
        profiles: []      
      });
      toggleModal();
    }
console.log(userEdit.id );

    return {
        control, 
        register,
        errors,
        handleSubmit,
        submitUserForm,
        profiles,
        isEdit: userEdit.id !== undefined,
        openModal
    }
}