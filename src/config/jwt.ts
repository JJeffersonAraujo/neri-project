import jwt, { Secret } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'neri-secret-key';

export const jwtConfig = {
  secret: secret as Secret,
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
};
