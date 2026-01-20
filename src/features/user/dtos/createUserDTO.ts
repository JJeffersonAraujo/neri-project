import { z } from 'zod'

// Schema de criação de usuário com validações
export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .max(100, { message: 'Nome deve ter no máximo 100 caracteres' }),
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
    .regex(/[A-Z]/, { message: 'Senha deve conter pelo menos uma letra maiúscula' })
    .regex(/[0-9]/, { message: 'Senha deve conter pelo menos um número' }),
  role: z.enum(['admin', 'profissional_saude', 'gestor', 'cliente'])
})

// Schema de atualização (campos opcionais)
export const UpdateUserSchema = CreateUserSchema.partial()

// Schema de login
export const LoginUserSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' })
})

// Inferindo tipos do Zod (melhor que interfaces manuais)
export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
export type LoginUserInput = z.infer<typeof LoginUserSchema>