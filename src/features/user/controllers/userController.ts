import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  private userService = new UserService();

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
