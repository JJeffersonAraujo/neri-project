import bcrypt from 'bcrypt';
import { prisma } from '../../../shared/database/prismaClient.js';
import { Role } from '@prisma/client';
export class UserService {
    async create(data) {
        const emailExists = await prisma.usuario.findUnique({
            where: { email: data.email },
        });
        if (emailExists) {
            throw new Error('E-mail já cadastrado');
        }
        const senhaHash = await bcrypt.hash(data.senha, 10);
        return prisma.usuario.create({
            data: {
                nome: data.nome,
                email: data.email,
                senhaHash,
                role: data.role ?? Role.USER,
            },
            select: {
                id: true,
                nome: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    }
    async findAll() {
        return prisma.usuario.findMany({
            where: { deletedAt: null },
            select: {
                id: true,
                nome: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    }
    async findById(id) {
        const user = await prisma.usuario.findFirst({
            where: { id, deletedAt: null },
            select: {
                id: true,
                nome: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        if (!user)
            throw new Error('Usuário não encontrado');
        return user;
    }
    async update(id, data) {
        const user = await prisma.usuario.findUnique({ where: { id } });
        if (!user || user.deletedAt)
            throw new Error('Usuário não encontrado');
        const updateData = {};
        if (data.nome)
            updateData.nome = data.nome;
        if (data.email)
            updateData.email = data.email;
        if (data.role)
            updateData.role = data.role;
        if (data.senha) {
            updateData.senhaHash = await bcrypt.hash(data.senha, 10);
        }
        return prisma.usuario.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                nome: true,
                email: true,
                role: true,
                updatedAt: true,
            },
        });
    }
    async delete(id) {
        await prisma.usuario.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
//# sourceMappingURL=userServices.js.map