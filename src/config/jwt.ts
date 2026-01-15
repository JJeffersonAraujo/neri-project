import 'dotenv/config';
import { SignOptions } from 'jsonwebtoken';

interface JwtConfig {
  access: {
    secret: string;
    options: SignOptions;
  };
  refresh: {
    secret: string;
    options: SignOptions;
  };
}

export const jwtConfig: JwtConfig = {
  access: {
    secret: process.env.JWT_SECRET as string,
    options: {
      expiresIn: '15m',
    },
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET as string,
    options: {
      expiresIn: '30d',
    },
  },
};
