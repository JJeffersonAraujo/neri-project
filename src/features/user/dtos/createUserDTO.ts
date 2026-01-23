// createUserDTO.ts
import { z } from 'zod'

export const createUserSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string().min(6),
  role: z.enum(['ADMIN', 'GESTOR', 'PROFISSIONAL', 'USER']).optional(),
})
