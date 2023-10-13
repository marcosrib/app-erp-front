import { z } from "zod";

const profileSchema = z.object({
    value: z.number()
    .positive('O perfil é obrigatório'),
    label: z.string(),
  });
  
export const userFormSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(5,{ message: "O nome precisa er no minimo 5 caracteres" }),
    email: z.string()
      .nonempty('O e-mail é obrigatório')
      .email('Formato do e-mail inválido'),
    profile: profileSchema,
    password: z.string()
}).refine((data) => {
  if (data.id === undefined) {    
    return data.password && data.password.length >= 8;
  }
  return true; 
}, {
  path: ["password"],
  message: "A senha precisa ter no minimo 8 caractéres",
});