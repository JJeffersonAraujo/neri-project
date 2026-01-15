import { prisma } from '../../../shared/prisma';

export class UserRepository {
  async create(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email.trim().toLowerCase(),
        password: data.password,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async incrementLoginAttempts(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        loginAttempts: { increment: 1 },
      },
    });
  }

  async lockUser(userId: string, minutes = 15) {
    const lockedUntil = new Date(Date.now() + minutes * 60 * 1000);

    return prisma.user.update({
      where: { id: userId },
      data: {
        lockedUntil,
      },
    });
  }

  async resetLoginAttempts(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        loginAttempts: 0,
        lockedUntil: null,
      },
    });
  }
}
