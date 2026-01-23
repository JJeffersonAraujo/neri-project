import { prisma } from '../../../shared/database/prismaClient.js'

export class PasswordResetRepository {
  async create(data: {
    token: string
    usuarioId: number
    expiresAt: Date
  }) {
    return prisma.passwordResetToken.create({
      data: {
        token: data.token,
        usuarioId: data.usuarioId,
        expiresAt: data.expiresAt,
      },
    })
  }

  async findByToken(token: string) {
    return prisma.passwordResetToken.findFirst({
      where: {
        token,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        usuario: true,
      },
    })
  }

  async markAsUsed(id: string) {
    return prisma.passwordResetToken.update({
      where: { id },
      data: { used: true },
    })
  }

  async invalidateUserTokens(usuarioId: number) {
    return prisma.passwordResetToken.updateMany({
      where: {
        usuarioId,
        used: false,
      },
      data: {
        used: true,
      },
    })
  }
}
