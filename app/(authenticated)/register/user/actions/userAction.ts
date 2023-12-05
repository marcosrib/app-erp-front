'use server'

import { fetchApi } from "@/app/services/fetchApi";
import { ProfileProps, SelectProfileOptionsProps, UserEditFormTypeSchema, UserEditProps } from "../types";
import { getHeaders } from "@/app/(authenticated)/actions/headers";
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


export async function getUsers(url: string, token?: string) {
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
      return []
    } catch (error) {
      console.log(error);
      return []
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

  const respose = await fetchApi(`api/user/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(userWithProfilesArray)
  })
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