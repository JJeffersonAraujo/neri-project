export interface JwtUserPayload {
  id: string;
  email: string;
  role: string;
  iat?: number; // emitido em
  exp?: number; // expiração
}

