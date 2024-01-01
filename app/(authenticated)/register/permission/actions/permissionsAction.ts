'use server'

import { fetchApi } from "@/app/services/fetchApi";
import { getHeaders } from "@/app/(authenticated)/actions/headers";
import { AbilityIdsProps, PermissionDataProps, PermissionsProps, PermissionsTypeSchema } from "../types";

type Props = {
 permissions: PermissionsProps
}

export async function getPermissions(url: string)  {
  try {
    const headers = await getHeaders();
    return await fetchApi<Props>(url, {
        method: 'GET',
        headers: headers
    })
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getPerfil(url: string)  {
  try {
    const headers = await getHeaders();
    return await fetchApi<Props>(url, {
        method: 'GET',
        headers: headers
    })
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function updatePermissions(url: string, permissionFormData: PermissionsTypeSchema)  {
  try {    
    const headers = await getHeaders();
    await fetchApi<Props>(url, {
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

  function convertedPermissionFormData(formData: PermissionsTypeSchema) {
    const checkedAbilities = formData.permissions.flatMap((item) =>
    item.abilities
      .filter((ability) => ability.checked)
      .map((ability) => ({ id: ability.id }))
  ) as AbilityIdsProps[];
  
    const permission = {
      name: formData.name,
      abilities: checkedAbilities,
    };

    return permission;
  }
}