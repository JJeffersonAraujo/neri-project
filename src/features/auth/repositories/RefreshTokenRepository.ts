import { prisma } from '../../../shared/prisma';

export class RefreshTokenRepository {
  async create(data: {
    token: string;
    userId: string;
    expiresAt: Date;
  }) {
    return prisma.refreshToken.create({ data });
  }

  async findByToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async deleteById(id: string) {
    return prisma.refreshToken.delete({
      where: { id },
    });
  }

  async deleteAllByUser(userId: string) {
    return prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}
