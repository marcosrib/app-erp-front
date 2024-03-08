'use server'

import { getHeaders } from "@/app/(authenticated)/actions/headers";
import { fetchApi } from "@/app/services/fetchApi";
import { GetCostCenterProps, SelectCostCenterProps, costCenterTypeSchema } from "../types";
import { revalidatePath } from "next/cache";

export async function createCostCenter(costCenter: costCenterTypeSchema) {
    const headers = await getHeaders();
    try {
      await fetchApi('api/cost-center', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(costCenter)
      })
      revalidatePath('financial/cost-center')
      return  messageErro(201, 'Centro de custo cadastrado com sucesso');
    } catch (error) {
      const err = error as any;
      return messageErro( err.status, `Erro ao atualizar centro de custo: ${err.message}`);
    }
   
  }

  export async function updateCostCenter(data: costCenterTypeSchema, id: number) {
    const headers = await getHeaders();    
    try {
      await fetchApi(`api/cost-center/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
      })
      revalidatePath('financial/cost-center')
      return  messageErro(204, `Centro de custo atualizado com sucesso!`);
    } catch (error) {
      const err = error as any;
      return messageErro( err.status, `Erro ao atualizar centro de custo: ${err.message}`);
    }
   
  }

  export async function getCostCenter(): Promise<SelectCostCenterProps[]> {
    const headers = await getHeaders();
    try {
      const respose = await fetchApi<GetCostCenterProps[]>('api/cost-center', {
        method: 'GET',
        headers: headers
      })
      if(respose) {
        return respose?.map((getCostCenter: GetCostCenterProps) => ({
          value: getCostCenter.id,
          label: getCostCenter.name
        }));
      }
      return [{ value: 0, label: 'Nenhum centro de custo encontrado'}]
    } catch (error) {
      console.log(error);
      return []
    }
  }
 

  function messageErro(status: number, message: string) {
    return { 
      status,
      message
    }
  }