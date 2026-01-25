import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient({
    log: ['query', 'error'],
});
//# sourceMappingURL=prismaClient.js.map