
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema } from "./schema";
import { useModalStore } from "@/app/(authenticated)/components/modal/stores/useModalStore";
import { UserDataProps, ProfileProps, SelectProfileOptionsProps, UserFormData, UpdateSatusProps } from "../types";
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
  
      const mutationCreateUser = useMutation((user: UserDataProps) => {
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

      const mutationEditUser = useMutation((user: UserDataProps) => {
        return api.put(`/api/user/${user.id}`, user);
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(['table']);
          queryClient.fetchQuery(['table', 1])
          toggleModal();
          toast.success('Usuário editado com sucesso');
        },
        onError: (error: any) => {         
          toast.error(error.response.data.message);
        },
      });

      const mutationEditStatusUser = useMutation((updateSatus: UpdateSatusProps) => {
        const status = updateSatus.status; 
        return api.patch(`/api/user/${updateSatus.id}`, { status });
      }, {
        onSuccess: (response) => {
          let status = JSON.parse(response.config.data).status ? "Ativado" : "Inativado";
          queryClient.invalidateQueries(['table']);
          toast.success(`Usuario ${status} com sucesso`);
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
        setValue('status', userEdit.status)
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
        mutationEditUser.mutate(userWithProfilesArray);
          return ;
      }
      mutationCreateUser.mutate(userWithProfilesArray);
    }  

    function setIdValueInSchema() {
      if(userEdit.id !== undefined ) {
        setValue('id', userEdit.id);
        setValue('password', '');
      }
    }

  function updateSatus(user: UserFormData) {
    const updateSatusData = {
      id: user.id,
      status: !user.status
    }
    mutationEditStatusUser.mutate(updateSatusData);
  }

   function openModal() {
    setValue('id', undefined);
      addUserEdit({
        'id': undefined,
        email: '',
        name: '',
        password: '',
        profiles: [],
        status: false
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
        isEdit: userEdit.id !== undefined,
        openModal,
        updateSatus
    }
}