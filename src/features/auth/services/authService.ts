import bcrypt from 'bcryptjs'
import { prisma } from '../../../config/database'
import { JwtUtils } from '../../../shared/utils/jwtUtils'

interface LoginDTO {
  email: string
  senha: string
}

export class AuthService {
  async login({ email, senha }: LoginDTO) {
    const user = await prisma.usuario.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error('Credenciais inválidas')
    }

    const passwordMatch = await bcrypt.compare(
      senha,
      user.senhaHash
    )

    if (!passwordMatch) {
      throw new Error('Credenciais inválidas')
    }

    // ✅ Payload padronizado
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    }

    const token = JwtUtils.signAccessToken(payload)
    const refreshToken = JwtUtils.signRefreshToken(payload)

    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    }
  }

  async refreshToken(refreshToken: string) {
    const payload = JwtUtils.verifyRefreshToken(refreshToken)

    // ✅ Reemite access token com payload completo
    const token = JwtUtils.signAccessToken({
      id: payload.id,
      email: payload.email,
      role: payload.role,
    })

    return { token }
  }

  async logout(refreshToken: string) {
    await prisma.authSessao.updateMany({
      where: { token: refreshToken },
      data: { deletedAt: new Date() },
    })
  }
}
