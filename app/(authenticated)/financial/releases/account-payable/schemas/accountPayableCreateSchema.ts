import { formatStringToDate } from '@/app/(authenticated)/utils/formatDate';
import {  z } from 'zod';

const costCenterSchema = z.object({
  value: z.number().positive('O centro de custo é obrigatório'),
  label: z.string()
})

const chartAccountSchema = z.object({
  value: z.number().positive('O plano de contas é obrigatório'),
  label: z.string()
})

const statusSchema = z.object({
  value: z.string().min(1, { message: 'O status é obrigatório' }),
  label: z.string().min(1, { message: 'O status é obrigatório' })
})

export const accountPayableCreateSchema = z.object({
  status: statusSchema,
  dateDue: z.string().transform((str) => { return formatStringToDate(str)}),
  value: z.string(),
  costCenter: costCenterSchema,
  chartAccount: chartAccountSchema,
}).refine((data) => {  
  return !(data.dateDue === null)
}, {
  message: "Data vencimento é obrigatário",
  path: ["dateDue"],
}).refine((data) => {  
  return !(data.dateDue === undefined)
}, {
  message: "Data vencimento invalida",
  path: ["dateDue"],
})
