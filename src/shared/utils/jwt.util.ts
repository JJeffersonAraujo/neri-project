import { Secret, SignOptions } from 'jsonwebtoken'

export const jwtConfig: {
  secret: Secret
  expiresIn: SignOptions['expiresIn']
} = {
  secret: 'neri-secret-key',
  expiresIn: '1d',
}
