import { z } from 'zod'

export const registrarExecucaoDTO = z.object({
  escalaId: z.coerce.number(),
  inicioExecutado: z.string().datetime(),
  fimExecutado: z.string().datetime(),
})

export type RegistrarExecucaoDTO = {
  escalaId: number
  inicioExecutado: string
  fimExecutado: string
}
