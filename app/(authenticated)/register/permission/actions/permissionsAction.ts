'use server'

import { fetchApi } from "@/app/services/fetchApi";
import { getHeaders } from "@/app/(authenticated)/actions/headers";
import { PermissionsProps } from "../types";

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

export async function updatePermissions(url: string, permission: PermissionsProps)  {
  try {
    console.log(permission);
    
    const headers = await getHeaders();
    await fetchApi<Props>(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(permission)
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