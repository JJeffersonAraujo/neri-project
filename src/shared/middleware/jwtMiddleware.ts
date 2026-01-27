import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.js";
import type { AuthenticatedUser } from "../types/authenticatedUser.js";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      jwtConfig.secret
    ) as AuthenticatedUser;

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}

// 🔑 USADO PELO TSOA
export async function expressAuthentication(
  request: Request,
  _securityName: string,
  _scopes?: string[]
): Promise<AuthenticatedUser> {
  if (!request.user) {
    throw new Error("Não autenticado");
  }

  return request.user;
}
