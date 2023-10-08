import { z } from "zod";

const profileSchema = z.object({
    value: z.number(),
    label: z.string(),
  });
  
export const userFormSchema = z.object({
    name: z.string(),
    email: z.string()
      .nonempty('O e-mail é obrigatório')
      .email('Formato do e-mail inválido'),
    password: z.string(),
    profile: profileSchema
})
