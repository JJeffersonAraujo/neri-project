import type { AuthenticatedUser } from "@/features/auth/types/auth.types.js";
import type { Request } from "express";

declare module "express" {
  interface Request {
    user?: AuthenticatedUser;
  }
}
