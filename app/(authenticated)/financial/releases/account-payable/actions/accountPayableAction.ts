'use server'

import { getHeaders } from "@/app/(authenticated)/actions/headers";
import { fetchApi } from "@/app/services/fetchApi";
import { accountsPayableCreateTypeSchema } from "../types";
import { revalidatePath } from "next/cache";
import { formatCurrency } from "@/app/(authenticated)/utils/formatCurrency";

export async function createAccountPayable(data: accountsPayableCreateTypeSchema) {
    const headers = await getHeaders();
    const accountPayable = {
      status: data.status.value,
      chartAccountId: data.chartAccount.value,
      value: formatCurrency(data.value),
      costCenterId: data.costCenter.value,
      dueDate: data.dateDue,
    };
    try {
      await fetchApi('api/account-payable', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(accountPayable)
      })
      revalidatePath('financial/releases')
      return  messageErro(201, 'Contas a pagar cadastrado com sucesso');
    } catch (error) {
      const err = error as any;
      return messageErro( err.status, `Erro ao criar contas a pagar: ${err.message}`);
    }
   
  }

  export async function updateAccountPayable(data: accountsPayableCreateTypeSchema, id: number) {
    const headers = await getHeaders();    
    try {
      await fetchApi(`api/account-payable/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
      })
      revalidatePath('financial/releases')
      return  messageErro(204, `Contas a pagar atualizado com sucesso!`);
    } catch (error) {
      const err = error as any;
      return messageErro( err.status, `Erro ao atualizar centro de custo: ${err.message}`);
    }
  }

  function messageErro(status: number, message: string) {
    return { 
      status,
      message
    }
  }