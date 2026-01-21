import { z } from 'zod'

export const createProfissionalSaudeSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  role: z.literal('profissionalSaude')
})


export type CreateProfissionalSaudeDTO = z.infer<typeof createProfissionalSaudeSchema>