import type { AuthenticatedUser } from "../../features/types/auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
