import { z } from 'zod'

export const resetPasswordSchema = z.object({
  token: z.string(),
  senha: z.string().min(6),
})

export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>
