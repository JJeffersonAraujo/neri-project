import { Secret, SignOptions } from 'jsonwebtoken'

export const jwtConfig: {
  secret: Secret
  expiresIn: SignOptions['expiresIn']
} = {
  secret: process.env.JWT_SECRET as Secret,
  expiresIn: process.env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
}
