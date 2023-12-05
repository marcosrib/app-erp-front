import { z } from "zod";

const profileSchema = z.object({
    value: z.number()
    .positive('O perfil é obrigatório'),
    label: z.string(),
  });
  
export const userEditSchema = z.object({
    name: z.string().min(5,{ message: "O nome precisa ter no minimo 5 caracteres" }),
    email: z.string()
      .email('Formato do e-mail inválido'),
    profile: profileSchema,
    password: z.string(),
    status: z.boolean(),
})