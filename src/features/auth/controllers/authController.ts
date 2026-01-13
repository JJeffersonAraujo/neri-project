import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.authService.login(req.body);
      return res.json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
