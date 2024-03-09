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
  costCenter: costCenterSchema
});
