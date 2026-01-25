import type { AuthenticatedUser } from "./authenticatedUser.js";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthenticatedUser;
    }
  }
}

export {};
