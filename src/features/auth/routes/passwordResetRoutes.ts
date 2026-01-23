import { Request, Response } from 'express'
import { PasswordResetService } from '../services/passwordResetService.js'
import {
  ApiBody,
  ApiResponse,
  ApiTag,
} from '../../../shared/decorators/swagger/index.js'
import { forgotPasswordSchema } from '../dtos/forgotPasswordDTO.js'
import { resetPasswordSchema } from '../dtos/resetPasswordDTO.js'

@ApiTag('Auth')
export class PasswordResetController {
  private passwordResetService = new PasswordResetService()

  @ApiBody(forgotPasswordSchema)
  @ApiResponse(200, 'Email de recuperação enviado')
  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body

    await this.passwordResetService.forgotPassword(email)

    return res.status(200).json({
      message: 'Se o email existir, você receberá instruções para redefinir a senha',
    })
  }

  @ApiBody(resetPasswordSchema)
  @ApiResponse(200, 'Senha redefinida com sucesso')
  @ApiResponse(400, 'Token inválido ou expirado')
  async resetPassword(req: Request, res: Response) {
    try {
      const { token, senha } = req.body

      await this.passwordResetService.resetPassword(token, senha)

      return res.status(200).json({
        message: 'Senha redefinida com sucesso',
      })
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
}
