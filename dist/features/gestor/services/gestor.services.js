import { prisma } from '../../../shared/database/prismaClient.js';
import { Role } from '@prisma/client';
export class gestorService {
    static async create(data) {
        return prisma.usuario.create({
            data: {
                nome: data.name,
                email: data.email,
                senhaHash: data.password,
                role: Role.GESTOR,
            },
        });
    }
    static async findAll() {
        return prisma.usuario.findMany({
            where: {
                role: Role.GESTOR,
                deletedAt: null,
            },
        });
    }
    static async findById(id) {
        return prisma.usuario.findFirst({
            where: {
                id: Number(id),
                role: Role.GESTOR,
                deletedAt: null,
            },
        });
    }
    static async update(id, data) {
        const exists = await this.findById(id);
        if (!exists)
            return null;
        return prisma.usuario.update({
            where: { id: Number(id) },
            data: {
                nome: data.name,
                email: data.email,
            },
        });
    }
    static async delete(id) {
        const exists = await this.findById(id);
        if (!exists)
            return false;
        await prisma.usuario.update({
            where: { id: Number(id) },
            data: { deletedAt: new Date() },
        });
        return true;
    }
}
