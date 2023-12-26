import { any, z } from "zod";

const AbilitySchema = z.object({
    id: z.number().optional(),
    checked: z.boolean().optional(),
  });

export const permissionsSchema = z.object({
   name: z.string().min(1,{message: 'O nome é obrigatório'}),
   abilities: z.array(AbilitySchema).optional(),
   permissions: any()
});