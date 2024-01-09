'use server'

import { fetchApi } from "@/app/services/fetchApi";
import { getHeaders } from "@/app/(authenticated)/actions/headers";
import { AbilityIdsProps, PermissionsProps, PerfilProps, PermissionsTypeSchema } from "../types";

export async function getPermissions(url: string): Promise<PermissionsProps[] | undefined> {
  try {
    const headers = await getHeaders();
    return await fetchApi<PermissionsProps[]>(url, {
        method: 'GET',
        headers: headers
    })
  } catch (error) {
    console.log(error)
    return undefined;
  }
}

export async function getPerfil(url: string): Promise<PerfilProps | undefined> {
  try {
    const headers = await getHeaders();
    return await fetchApi(url, {
        method: 'GET',
        headers: headers
    })
  } catch (error) {
    console.log(error)
    return undefined;
  }
}

export async function updatePermissions(url: string, permissionFormData: PermissionsTypeSchema)  {
  try {    
    const headers = await getHeaders();
    await fetchApi(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(convertedPermissionFormData(permissionFormData))
    })
   
    return { 
      status: 201,
      message : 'Usuário cadastrado com sucesso'
    }
  } catch (error) {
    const err = error as any;
    console.log(err);
    
    return { 
      stauts: err.status,
      message : 'Erro ao cadastrar usuário:' + err.message
    }
  }
}
export async function createPermissions(url: string, permissionFormData: PermissionsTypeSchema)  {
  try {    
    const headers = await getHeaders();
    await fetchApi(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(convertedPermissionFormData(permissionFormData))
    })
   
    return { 
      status: 201,
      message : 'Usuário cadastrado com sucesso'
    }
  } catch (error) {
    const err = error as any;
    console.log(err);
    
    return { 
      stauts: err.status,
      message : 'Erro ao cadastrar usuário:' + err.message
    }
  }
}
  

  function convertedPermissionFormData(formData: PermissionsTypeSchema) {
    const checkedAbilities = formData.permissions.flatMap((item) =>
    item.abilities
      .filter((ability) => ability.checked)
      .map((ability) => ({ id: ability.id }))
  ) as AbilityIdsProps[];
  
    const permission = {
      name: formData.name,
      description: formData.description,
      abilities: checkedAbilities,
    };

    return permission;
  }
