import type { Request } from 'express'
import { JwtUtils } from '../utils/jwtUtils.js'
import { prisma } from '../database/prismaClient.js'
import type { AuthenticatedUser } from '../types/authenticatedUser.js'

export async function expressAuthentication(
  request: Request,
  securityName: string
): Promise<AuthenticatedUser> {

  if (securityName !== 'bearerAuth') {
    throw new Error('Security scheme não suportado')
  }

  const authHeader = request.headers.authorization

  if (!authHeader) {
    const err: any = new Error('Token não fornecido')
    err.status = 401
    throw err
  }

  const token = authHeader.replace(/^Bearer\s+/i, '')

  const payload = JwtUtils.verifyAccessToken(token)

  const user = await prisma.usuario.findUnique({
    where: { id: payload.id },
  })

  if (!user) {
    const err: any = new Error('Usuário não encontrado')
    err.status = 401
    throw err
  }

  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    role: user.role,
  }
}
