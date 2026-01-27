import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

const secret = process.env.JWT_SECRET ?? "dev-secret";

export const jwtConfig = {
  secret, // string
  accessTokenOptions: {
    expiresIn: "15m",
  } satisfies SignOptions,
  refreshTokenOptions: {
    expiresIn: "7d",
  } satisfies SignOptions,
};

export default jwt;
