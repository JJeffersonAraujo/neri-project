import { PrismaClient, Prisma, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
type Usuario = Prisma.UsuarioGetPayload<{}>;

export class UserRepository {
  // Criar usuário
  async create(data: {
    nome: string;
    email: string;
    senha: string;
    role: keyof typeof Role; // 🔹 usa a chave do enum
  }): Promise<Usuario> {
    const senhaHash = await bcrypt.hash(data.senha, 10);

    return prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senhaHash,
        role: Role[data.role], // 🔹 converte string para enum
      },
    });
  }

  // Listar todos
  async findAll(): Promise<Usuario[]> {
    return prisma.usuario.findMany();
  }

  // Buscar por ID
  async findById(id: number): Promise<Usuario | null> {
    return prisma.usuario.findUnique({ where: { id } });
  }

  // Atualizar usuário
  async update(
    id: number,
    data: Partial<{
      nome: string;
      email: string;
      senha?: string;
      role: keyof typeof Role;
    }>
  ): Promise<Usuario> {
    const updateData: any = { ...data };

    if (data.senha) {
      updateData.senhaHash = await bcrypt.hash(data.senha, 10);
      delete updateData.senha;
    }

    if (data.role) {
      updateData.role = Role[data.role]; // 🔹 converte string para enum
    }

    return prisma.usuario.update({ where: { id }, data: updateData });
  }

  // Soft delete
  async delete(id: number): Promise<Usuario> {
    return prisma.usuario.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
