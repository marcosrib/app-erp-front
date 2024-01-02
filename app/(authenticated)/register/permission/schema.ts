import { z } from "zod";

const AbilitySchema = z.object({
    id: z.number().optional(),
    checked: z.boolean().optional(),
  });

export const permissionsSchema = z.array(
  z.object({
    abilities: z.array(AbilitySchema),
  })
);

export const permissionSchema = z.object({
  name: z.string().min(1,{message: 'O nome é obrigatório'}),
  description: z.string().max(500,{message: 'A descrição só pode ter no máximo 500 caracteres'}),
  permissions: permissionsSchema
});

