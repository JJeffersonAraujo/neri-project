// src/shared/utils/jwtUtils.ts
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

// Durações dos tokens
const ACCESS_TOKEN_EXPIRES_IN = "15m"; // 15 minutos
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // 7 dias

// Interface do payload do JWT
export interface JwtPayloadData {
  id: number;
  email: string;
  role: string;
}

export class JwtUtils {
  // Gera token de acesso
  static generateAccessToken(payload: JwtPayloadData): string {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  }

  // Gera token de refresh
  static generateRefreshToken(payload: JwtPayloadData): string {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  }

  // Verifica token de acesso
  static verifyAccessToken(token: string): JwtPayloadData {
    try {
      return jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayloadData;
    } catch (err) {
      throw { status: 401, message: "Access token inválido ou expirado" };
    }
  }

  // Verifica token de refresh
  static verifyRefreshToken(token: string): JwtPayloadData {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayloadData;
    } catch (err) {
      throw { status: 401, message: "Refresh token inválido ou expirado" };
    }
  }
}
