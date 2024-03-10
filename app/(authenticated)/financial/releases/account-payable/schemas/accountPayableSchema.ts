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
  dateVencInitial: z.string().transform((str) => new Date(str)),
  dateVencFinal: z.string().transform((str) => { 
    return str ? new Date(str) : undefined }),
  costCenter: costCenterSchema
}).partial().refine((partialInput) => {
  console.log('aqui', partialInput.dateVencFinal);
  if (partialInput.dateVencInitial && partialInput.dateVencFinal === undefined) {
    console.log('aqui');
    
    return false;
  }
  if (partialInput.dateVencInitial && partialInput.dateVencFinal) return true;

  return partialInput.dateVencInitial < partialInput.dateVencFinal;
});
