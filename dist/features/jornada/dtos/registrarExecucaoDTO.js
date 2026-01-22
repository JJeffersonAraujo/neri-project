import { z } from 'zod';
export const registrarExecucaoDTO = z.object({
    escalaId: z.coerce.number(), // 👈 CORREÇÃO IMPORTANTE
    inicioExecutado: z.string().datetime(),
    fimExecutado: z.string().datetime()
});
