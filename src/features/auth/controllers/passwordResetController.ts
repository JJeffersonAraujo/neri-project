import { Request, Response } from 'express'
import { PasswordResetService } from '../services/passwordResetService.js'

const service = new PasswordResetService()

export class PasswordResetController {
  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body

    await service.forgotPassword(email)

    return res.status(200).json({
      message:
        'Se o email existir, você receberá instruções para redefinir a senha',
    })
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, senha } = req.body

      await service.resetPassword(token, senha)

      return res.status(200).json({
        message: 'Senha redefinida com sucesso',
      })
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
}
