import { z } from "zod";

const AbilitySchema = z.object({
    id: z.number().optional(),
    checked: z.boolean().optional(),
  });

export const permissionsSchema: any = z.object({
   name: z.string().optional(),
   abilities: z.array(AbilitySchema).optional(),
});