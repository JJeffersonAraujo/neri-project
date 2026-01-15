import { Request, Response } from 'express';
import { UserService } from '../services/userService.js';
import { Role } from '@prisma/client';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, email, senha, role } = req.body;

      // Converte role string do JSON para Role enum
      let roleEnum: Role;
      switch (role) {
        case 'ADMIN':
        case 'GESTOR':
        case 'PROFISSIONAL':
        case 'USER':
          roleEnum = role;
          break;
        default:
          return res.status(400).json({ message: 'Role inválida' });
      }

      const user = await this.userService.createUser({
        nome,
        email,
        senha,
        role: roleEnum,
      });

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
