
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { submitUserFormDataProps, ProfileProps, SelectProfileOptionsProps, UserFormData } from "./types";
import api from "@/app/services/api";

import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema } from "./schema";
import { useModalStore } from "@/app/(authenticated)/components/modal/stores/useModalStore";


export function useFormUser() {
    const [profileOptions, setProfileOprions] = useState<SelectProfileOptionsProps[]>([]);
    const { userEdit, addUserEdit } = useUserStore();
    const { toggleModal } = useModalStore();
    const {
        control, 
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
      } = useForm<UserFormData>({
        mode: 'onBlur',
        resolver: zodResolver(userFormSchema)
      })
    
    function handleCreateUser(user: submitUserFormDataProps) {
        api.post('/api/user/', user)
        .then(response => {
          toggleModal()
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.message);
        });
    }
  
    const fetchProfiles = () => {
      api.get('/api/profile/')
        .then((profilesResponse) => {
          setProfileOprions(profilesResponse.data.map((profile: ProfileProps) => ({
            value: profile.id,
            label: profile.name,
          })))
        })
        .catch((error) => {
          console.error("Ocorreu um erro ao buscar os perfis:", error);
          throw error;
        });
    };
   
    useEffect(() => {
      fetchProfiles();
     },[])

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
    
    function submitUserForm(user: userFormData) {
      console.log('submit');
      
       // toggleModal()
        const { profile, ...userWithoutProfile } = user;
        const renamedProfile = {
            id: profile.value,
            name: profile.label,
          };
        
        const userWithProfilesArray = {
          ...userWithoutProfile,
          profiles: [renamedProfile],
        };

       

    /*  if(editFormData?.id) {
          return handleEditUser(userWithProfilesArray);
        }
        handleCreateUser(userWithProfilesArray);*/
    }  

   /* function openModal() {
      addUserEdit({
        id: '',
        email: '',
        name: '',
        password: '',
        profiles: []      
      });
      toggleModal();
    }*/

    return {
        control, 
        register,
        errors,
        handleSubmit,
        submitUserForm,
        profileOptions,
        //openModal
    }
}