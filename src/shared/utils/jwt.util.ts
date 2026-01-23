import { Secret, SignOptions } from 'jsonwebtoken';

export const jwtConfig: {
  secret: Secret;
  expiresIn: SignOptions['expiresIn'];
} = {
  secret: process.env.JWT_SECRET || 'neri-secret-key',
  expiresIn: (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '1d',
};
