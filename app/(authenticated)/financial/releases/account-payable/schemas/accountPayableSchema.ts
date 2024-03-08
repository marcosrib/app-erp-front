import {  z } from 'zod';
const costCenterSchema = z.object({
  value: z.number().optional(),
  label: z.string()
})
export const accountPayableSearchSchema = z.object({
  status: z.string(),
  costCenter: costCenterSchema
});
