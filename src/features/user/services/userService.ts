import { prisma } from '../../../shared/database/prismaClient.js';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { CreateUserDTO } from '../dtos/createUserDTO.js';

export class UserService {
  async createUser(data: CreateUserDTO) {
    const { nome, email, senha, role } = data;

    if (!nome || !email || !senha || !role) {
      throw new Error('Campos obrigatórios: nome, email, senha e role');
    }

    // Validação de enum
    if (!Object.values(Role).includes(role)) {
      throw new Error(`Role inválida. Valores aceitos: ${Object.values(Role).join(', ')}`);
    }

    // Verifica se usuário já existe
    const userExists = await prisma.usuario.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error('Usuário já existe');
    }

    // Gera hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria usuário
    const user = await prisma.usuario.create({
      data: {
        nome,
        email,
        senhaHash,
        role,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }
}
