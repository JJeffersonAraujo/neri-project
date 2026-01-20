import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../shared/database/prismaClient.js'
import { LoginDTO } from '../dtos/loginDTO.js'
import { jwtConfig } from '../../../shared/utils/jwt.util.js'

export class AuthService {
  async login(data: LoginDTO) {
    const user = await prisma.usuario.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      throw new Error('Email ou senha inválidos')
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.senhaHash
    )

    if (!passwordMatch) {
      throw new Error('Email ou senha inválidos')
    }

    const token = jwt.sign(
      { id: user.id },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    )

    return {
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    }
  }
}
