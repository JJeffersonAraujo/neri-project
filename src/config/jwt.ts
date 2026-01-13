import jwt, { Secret } from 'jsonwebtoken';

export const jwtConfig = {
  secret: 'neri-secret-key', // depois vira env
  expiresIn: '1d',
};
