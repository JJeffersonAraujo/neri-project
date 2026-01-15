import { Role } from '@prisma/client';

export interface CreateUserDTO {
  nome: string;      // corresponde ao campo 'nome' no banco
  email: string;
  senha: string;     // corresponde ao campo 'senhaHash' após hash
  role: Role;        // enum: ADMIN | GESTOR | PROFISSIONAL | USER
}
