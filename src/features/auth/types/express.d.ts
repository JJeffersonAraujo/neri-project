import { Role } from "@prisma/client"

declare namespace Express {
  export interface Request {
    user?: {
      id: string
      role: string
    }
  }
}
