'use server'
import { getHeaders } from "@/app/(authenticated)/actions/headers";
import { chartAccountTypeSchema } from "../types";
import { fetchApi } from "@/app/services/fetchApi";
import { revalidatePath } from "next/cache";

export async function createChartAccount(data: chartAccountTypeSchema) {
    const headers = await getHeaders();
    try {
      await fetchApi('api/chart-account', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      })
      revalidatePath('financial/chart-account')
      return  messageErro(201, 'Plano de contas cadastrado com sucesso');
    } catch (error) {
      const err = error as any;
      return messageErro(err.status, `Erro ao cadastrar plano de contas: ${err.message}`);
    }
  }

  export async function updateChartAccount(data: chartAccountTypeSchema, id: number) {
    const headers = await getHeaders();    
    const { chartAccountsGroup, type, ...dataAll } = data;

    const userWithProfilesArray = {
      ...dataAll,
      type: type?.value,
      chartAccountsGroupId: chartAccountsGroup?.value,
    };
       
   try {
      await fetchApi(`api/chart-account/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(userWithProfilesArray)
      })
      revalidatePath('financial/chart-account')
      return  messageErro(204, `Plano de contas atualizado com sucesso!`);
    } catch (error) {
      const err = error as any;
      return messageErro(err.status, `Erro ao atualizar plano de contas: ${err.message}`);
    }
   
  }

  function messageErro(status: number, message: string) {
    return { 
      status,
      message
    }
  }