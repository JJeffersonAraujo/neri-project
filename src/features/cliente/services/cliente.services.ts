import { prisma } from '../../../shared/database/prismaClient.js'
import { Role } from '@prisma/client'

export class AdminService {
  static async create(data: any) {
    return prisma.usuario.create({
      data: {
        nome: data.name,
        email: data.email,
        senhaHash: data.password,
        role: Role.ADMIN,
      },
    })
  }

  static async findAll() {
    return prisma.usuario.findMany({
      where: {
        role: Role.ADMIN,
        deletedAt: null,
      },
    })
  }

  static async findById(id: string) {
    return prisma.usuario.findFirst({
      where: {
        id: Number(id),
        role: Role.ADMIN,
        deletedAt: null,
      },
    })
  }

  static async update(id: string, data: any) {
    const exists = await this.findById(id)
    if (!exists) return null

    return prisma.usuario.update({
      where: { id: Number(id) },
      data: {
        nome: data.name,
        email: data.email,
      },
    })
  }

  static async delete(id: string): Promise<boolean> {
    const exists = await this.findById(id)
    if (!exists) return false

    await prisma.usuario.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    })

    return true
  }
}import { prisma } from '../../../shared/database/prismaClient.js'
import { Role } from '@prisma/client'

export class clienteService {
  static async create(data: any) {
    return prisma.usuario.create({
      data: {
        nome: data.name,
        email: data.email,
        senhaHash: data.password,
        role: Role.USER,
      },
    })
  }

  static async findAll() {
    return prisma.usuario.findMany({
      where: {
        role: Role.USER,
        deletedAt: null,
      },
    })
  }

  static async findById(id: string) {
    return prisma.usuario.findFirst({
      where: {
        id: Number(id),
        role: Role.USER,
        deletedAt: null,
      },
    })
  }

  static async update(id: string, data: any) {
    const exists = await this.findById(id)
    if (!exists) return null

    return prisma.usuario.update({
      where: { id: Number(id) },
      data: {
        nome: data.name,
        email: data.email,
      },
    })
  }

  static async delete(id: string): Promise<boolean> {
    const exists = await this.findById(id)
    if (!exists) return false

    await prisma.usuario.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    })

    return true
  }
}