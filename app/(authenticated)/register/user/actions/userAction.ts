'use server'

import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchApi } from "@/app/services/fetchApi";
import { getServerSession } from "next-auth";
import { ProfileProps, SelectProfileOptionsProps } from "../types";

export async function getProfiles(): Promise<SelectProfileOptionsProps[]> {
    const headers = await getHeaders();
    const respose = await fetchApi<ProfileProps[]>('api/profile/', {
        method: 'GET',
        headers: headers
      })
      console.log('respose', respose);
      
      return  [{
        value: respose[0].id,
        label: respose[0].name
      }]
}

async function getHeaders() {
  const session = await getServerSession(nextAuthOptions);
  const token =session?.accessToken
  return {
      'Authorization': `Bearer ${token}`
  }
}
