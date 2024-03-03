import { z } from 'zod';

export const accountPayableSearchSchema = z.object({
  status: z.string(),
  dueDate: z.date(),
  costCenter: z.string()
});
