import {  z } from 'zod';
const costCenterSchema = z.object({
  value: z.number().optional(),
  label: z.string()
})

const statusSchema = z.object({
  value: z.string(),
  label: z.string()
})

export const accountPayableCreateSchema = z.object({
  status: statusSchema,
  dateDue: z.string(),
  value: z.string(),
  costCenter: costCenterSchema
})
