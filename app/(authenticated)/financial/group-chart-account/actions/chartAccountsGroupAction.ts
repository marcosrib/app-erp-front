'use server'
import { getHeaders } from "@/app/(authenticated)/actions/headers";
import { chartAccountsGroupTypeSchema } from "../types";
import { fetchApi } from "@/app/services/fetchApi";
import { revalidatePath } from "next/cache";

export async function createChartAccountsGroup(chartAccountsGroup: chartAccountsGroupTypeSchema) {
    const headers = await getHeaders();
    try {
      await fetchApi('api/chart-accounts-group', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(chartAccountsGroup)
      })
      revalidatePath('financial/chart-account')
      return  messageErro(201, 'Centro de custo cadastrado com sucesso');
    } catch (error) {
      const err = error as any;
      return messageErro( err.status, `Erro ao cadastrar grupo plano de contas: ${err.message}`);
    }
  }

  export async function updateChartAccountsGroup(data: chartAccountsGroupTypeSchema, id: number) {
    const headers = await getHeaders();    
    try {
      await fetchApi(`api/chart-accounts-group/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
      })
      revalidatePath('financial/chart-account')
      return  messageErro(204, `Grupo plano de contas atualizado com sucesso!`);
    } catch (error) {
      const err = error as any;
      return messageErro( err.status, `Erro ao atualizar grupo plano de contas: ${err.message}`);
    }
   
  }

  function messageErro(status: number, message: string) {
    return { 
      status,
      message
    }
  }