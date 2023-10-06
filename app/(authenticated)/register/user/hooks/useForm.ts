import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SelectProfileOptions, submitUserFormDataProps, ProfileProps } from "./types";
import { userFormData } from "./types";
import api from "@/app/services/api";

import { userFormSchema } from "./schema";
import { useModal } from "@/app/(authenticated)/components/modal/hooks/useModal";
import { useState } from "react";


export function useFormUser() {
    const [profileOptions, setProfileOprions] = useState<SelectProfileOptions[]>([])
    const { toggleModal } = useModal()
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
   
    fetchProfiles();
      
    function handleEditUser(user: submitUserFormDataProps) {
       // console.log(editFormData?.id);
    }
    
    function submitUserForm(user: userFormData) {
        toggleModal()
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

    return {
        control, 
        register,
        errors,
        handleSubmit,
        submitUserForm,
        profileOptions
    }
}