import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

// Durações dos tokens
const ACCESS_TOKEN_EXPIRES_IN = "15m"; // 15 minutos
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // 7 dias

// Interface do payload do JWT (CONTRATO ÚNICO)
export interface JwtPayloadData {
  id: number;
  email: string;
  role: string;
}

export class JwtUtils {

  // ===== ACCESS TOKEN =====

  static generateAccessToken(payload: JwtPayloadData): string {
    return jwt.sign(
      payload,
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN as any }
    );
  }

  // Alias para não quebrar código que usa signAccessToken
  static signAccessToken(payload: JwtPayloadData): string {
    return this.generateAccessToken(payload);
  }

  static verifyAccessToken(token: string): JwtPayloadData {
    try {
      return jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayloadData;
    } catch {
      throw { status: 401, message: "Access token inválido ou expirado" };
    }
  }

  // ===== REFRESH TOKEN =====

  static generateRefreshToken(payload: JwtPayloadData): string {
    return jwt.sign(
      payload,
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN as any }
    );
  }

  // Alias de compatibilidade
  static signRefreshToken(payload: JwtPayloadData): string {
    return this.generateRefreshToken(payload);
  }

  static verifyRefreshToken(token: string): JwtPayloadData {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayloadData;
    } catch {
      throw { status: 401, message: "Refresh token inválido ou expirado" };
    }
  }
}
