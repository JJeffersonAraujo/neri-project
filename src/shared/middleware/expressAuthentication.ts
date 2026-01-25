import type { Request } from "express";
import { JwtUtils } from "../utils/jwtUtils.js";
import { prisma } from "../database/prismaClient.js";
import type { AuthenticatedUser } from "../types/authenticatedUser.js";

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<AuthenticatedUser> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw { status: 401, message: "Token não fornecido" };
  }

  const token = authHeader.replace("Bearer ", "");
  const payload = JwtUtils.verifyAccessToken(token);

  const user = await prisma.usuario.findUnique({
    where: { id: payload.id },
  });

  if (!user) {
    throw { status: 401, message: "Usuário não encontrado" };
  }

  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    role: user.role,
  };
}
