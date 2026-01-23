import { Secret, SignOptions } from 'jsonwebtoken'

export const jwtConfig: {
  id: string
  secret: Secret
  expiresIn: SignOptions['expiresIn']
} = {
  id: process.env.JWT_ID as string,
  secret: process.env.JWT_SECRET as Secret,
  expiresIn: process.env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
}
