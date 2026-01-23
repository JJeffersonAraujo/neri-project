import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { prisma } from '../../../shared/database/prismaClient.js'

export class PasswordResetService {
  /**
   * Gera token e salva no banco
   */
  async forgotPassword(email: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    })

    // Segurança: não revelar se existe
    if (!usuario) {
      return
    }

    const token = crypto.randomBytes(32).toString('hex')

    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 30)

    await prisma.passwordResetToken.create({
      data: {
        token,
        usuarioId: usuario.id,
        expiresAt,
        used: false,
      },
    })

    // mock de envio
    console.log('Password reset token:', token)
  }

  /**
   * Reseta a senha usando o token
   */
  async resetPassword(token: string, senha: string) {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    })

    if (
      !resetToken ||
      resetToken.used ||
      resetToken.expiresAt < new Date()
    ) {
      throw new Error('Token inválido ou expirado')
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    await prisma.$transaction([
      prisma.usuario.update({
        where: { id: resetToken.usuarioId },
        data: { senhaHash },
      }),

      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      }),
    ])
  }
}
