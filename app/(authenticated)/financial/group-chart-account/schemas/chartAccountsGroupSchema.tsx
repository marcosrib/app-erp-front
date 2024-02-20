import { z } from 'zod';

export const chartAccountsGroupSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'O nome precisa ter no minimo 5 caracteres' }),
});
