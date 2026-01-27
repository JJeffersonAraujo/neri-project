import type { Request } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../../config/jwt.js";
import type { AuthenticatedUser } from "../types/auth.types.js";

export async function expressAuthentication(
  request: Request,
  securityName: string
): Promise<AuthenticatedUser> {
  if (securityName !== "jwt") {
    throw new Error("Security inválida");
  }

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token não informado");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as AuthenticatedUser;
    return decoded;
  } catch {
    throw new Error("Token inválido");
  }
}
