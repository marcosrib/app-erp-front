'use server'

import { fetchApi } from "@/app/services/fetchApi";
import { ProfileProps, SelectProfileOptionsProps, UserCreateTypeSchema, UserEditFormTypeSchema, UserEditProps } from "../types";
import { getHeaders } from "@/app/(authenticated)/actions/headers";
import { revalidatePath, revalidateTag } from "next/cache";


interface Profiles {
  id: string,
  name: string
}

interface User {
  id: string,
  name: string,
  email: string,
  status: string,
  profiles: Profiles[]
}

interface UserData {
  data: User[],
  totalPages: number,
  totalElements: number,
  nextPage: number,
  previousPage: number,
  currentPage: number
}


export async function getUsers(url: string)  {
  try {
    const headers = await getHeaders();
    return await fetchApi<UserData>(url, {
        method: 'GET',
        headers: headers
    })
  } catch (error) {
    console.log(error)
    return []
  }
}


export async function getProfiles(): Promise<SelectProfileOptionsProps[]> {
    const headers = await getHeaders();
    try {
      const respose = await fetchApi<ProfileProps[]>('api/profile/', {
        method: 'GET',
        headers: headers
      })
      if(respose) {
        return respose?.map((profile: ProfileProps) => ({
          value: profile.id,
          label: profile.name
        }));
      }
      return [{ value: 0, label: 'Nenhum perfil encontrado'}]
    } catch (error) {
      console.log(error);
      return []
    }
 
     
}

export async function createUser(user: UserCreateTypeSchema) {
  const headers = await getHeaders();
  const { profile, ...userWithoutProfile } = user;
  const renamedProfile = {
      id: profile.value,
      name: profile.label,
    };
  
  const userWithProfilesArray = {
    ...userWithoutProfile,
    profiles: [renamedProfile],
  };

  try {
    await fetchApi('api/user/', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(userWithProfilesArray)
    })
    return { 
      status: 201,
      message : 'Usuário cadastrado com sucesso'
    }
  } catch (error) {
    const err = error as any;
    return { 
      stauts: err.status,
      message : 'Erro ao cadastrar usuário:' + err.message
    }
  }
 
}

export async function updateUser(user: UserEditFormTypeSchema, id: number | undefined) {
  const headers = await getHeaders();
  const { profile, ...userWithoutProfile } = user;
  const renamedProfile = {
      id: profile.value,
      name: profile.label,
    };
  
  const userWithProfilesArray = {
    ...userWithoutProfile,
    profiles: [renamedProfile],
  };

  try {
    await fetchApi(`api/user/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(userWithProfilesArray)
    })
    return  messageErro(204, `Usuário atualizado com sucesso!`);
  } catch (error) {
    const err = error as any;
    return messageErro( err.status, `Usuário ao atualizar usuário: ${err.message}`);
  }
 
}

export async function updateStatusUser(status: boolean, id: number | undefined) {
  const headers = await getHeaders();
  const statuMessage = status ? 'ativado' : 'inativado'
  try {
    await fetchApi(`api/user/${id}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ status })
    })
 
    return  messageErro(201, `Usuário ${statuMessage} com sucesso!`);
  
  } catch (error) {
    const err = error as any;
    return  messageErro(err.status, `Erro ao atualizar status do usuário: ${err.message}`);
  }
 
}

export async function getUserById(id: number): Promise<UserEditProps> {

  try {
    const headers = await getHeaders();
    const respose = await fetchApi<UserEditProps>(`api/user/${id}`, {
      method: 'GET',
      headers: headers
    })
    return respose;
} catch (error) {
  throw error
}
}

function messageErro(status: number, message: string) {
  return { 
    status,
    message
  }
}