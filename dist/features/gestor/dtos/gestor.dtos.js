import { z } from 'zod';
export const createGestorSchema = z.object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
    email: z.string().email('Email inválido').optional(),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    data: z.date().optional(),
});
