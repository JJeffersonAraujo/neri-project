import { Request, Response } from 'express'
import { AuthService } from '../services/authService.js'

export class AuthController {
  private authService = new AuthService()

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body

      const result = await this.authService.login({
        email,
        password: senha
      })

      return res.json(result)
    } catch (error: any) {
      return res.status(401).json({ message: error.message })
    }
  }
}
