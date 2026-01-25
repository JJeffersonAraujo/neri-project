// src/config/database.ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Opcional: conectar automaticamente ao iniciar
prisma.$connect()
  .then(() => console.log("Prisma conectado!"))
  .catch((err) => console.error("Erro ao conectar Prisma:", err));
