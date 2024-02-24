import { z } from 'zod';
const chartAccountGroupSchema = z.object({
  value: z.number().positive('O perfil é obrigatório'),
  label: z.string(),
});

const typeSchema = z.object({
  value: z.string().min(1, { message: 'O tipo é obrigatório' }),
  label: z.string(),
});

const chartAccountsGroupSchema = z.object({
  value: z.number().positive('O Grupo plano de contas é obrigatório'),
  label: z.string(),
});

export const chartAccountSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'O nome precisa ter no minimo 5 caracteres' }),
  type: typeSchema,
  chartAccountsGroup: chartAccountsGroupSchema,
});
