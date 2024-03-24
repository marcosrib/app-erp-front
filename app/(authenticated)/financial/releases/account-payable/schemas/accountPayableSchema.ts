import { formatStringToDate } from '@/app/(authenticated)/utils/formatDate';
import {  z } from 'zod';
const costCenterSchema = z.object({
  value: z.number().optional(),
  label: z.string()
})

const statusSchema = z.object({
  value: z.string(),
  label: z.string()
})

export const accountPayableSearchSchema = z.object({
  status: statusSchema,
  dateDueInitial: z.string().transform((str) => {     
    return str ? formatStringToDate(str): undefined }),
    dateDueFinal: z.string().transform((str) => { 
    return str ? formatStringToDate(str) : undefined }),
  costCenter: costCenterSchema
}).refine((data) => {  
  return !(data.dateDueInitial && !data.dateDueFinal)
}, {
  message: "Data vencimento final é obrigatário",
  path: ["dateVencFinal"],
}).refine((data) => {
  if(data.dateDueFinal && data.dateDueInitial ) {
    return !(data.dateDueInitial > data.dateDueFinal)
  }
   return true;
}, {
  message: "Data vencimento final não pode ser menor que a data vencimento incial",
  path: ["dateVencFinal"],
});;
