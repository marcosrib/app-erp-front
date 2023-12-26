import { z } from "zod";

export const userSearchSchema = z.object({
    email: z.string()
      .email('Formato do e-mail inválido'),
});
