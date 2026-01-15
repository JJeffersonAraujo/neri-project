import 'dotenv/config';

import { SignOptions } from 'jsonwebtoken';

interface JwtConfig {
  secret: string;
  signOptions: SignOptions;
}

export const jwtConfig: JwtConfig = {
  secret: process.env.JWT_SECRET as string,
  signOptions: {
    expiresIn: '1d',
  },
};
