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
  dateVencInitial: z.string().transform((str) => { 
    return str ? new Date(str) : undefined }),
  dateVencFinal: z.string().transform((str) => { 
    return str ? new Date(str) : undefined }),
  costCenter: costCenterSchema
}).refine((data) => {
  console.log(data.dateVencInitial);
  
  return !(data.dateVencInitial && !data.dateVencFinal)
}, {
  message: "Data vencimento final é obrigatário",
  path: ["dateVencFinal"],
}).refine((data) => {
  if(data.dateVencFinal && data.dateVencInitial ) {
    return !(data.dateVencInitial > data.dateVencFinal)
  }
   return true;
}, {
  message: "Data vencimento final não pode ser menor que a data vencimento incial",
  path: ["dateVencFinal"],
});;
