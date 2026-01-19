// src/features/jornada/dto/registrarExecucaoDTO.ts
import { z } from 'zod'

export const registrarExecucaoDTO = z.object({
  escalaId: z.number(),
  inicioExecutado: z.string().datetime(),
  fimExecutado: z.string().datetime()
})

export type RegistrarExecucaoDTO = z.infer<typeof registrarExecucaoDTO>
