import { PrismaClient, Prisma, Role } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
export class UserRepository {
    // Criar usuário
    async create(data) {
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
    async findAll() {
        return prisma.usuario.findMany();
    }
    // Buscar por ID
    async findById(id) {
        return prisma.usuario.findUnique({ where: { id } });
    }
    // Atualizar usuário
    async update(id, data) {
        const updateData = { ...data };
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
    async delete(id) {
        return prisma.usuario.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
//# sourceMappingURL=userRepository.js.map