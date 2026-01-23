import { Request, Response } from 'express' 
import { UserService } from '../../user/services/userServices.js'
import { Role } from '@prisma/client'
import {
  ApiAuth,
  ApiBody,
  ApiResponse,
  ApiTag,
} from '../../../shared/decorators/swagger/index.js'
import { createUserSchema } from '../../user/dtos/createUserDTO.js'

@ApiTag('Users')
export class UserController {
  private userService = new UserService()

  @ApiBody(createUserSchema)
  @ApiResponse(201, 'Usuário criado com sucesso')
  @ApiResponse(400, 'Dados inválidos')
  @ApiResponse(409, 'E-mail já cadastrado')
  async create(req: Request, res: Response) {
    try {
      const { nome, email, senha, role } = req.body

      if (role && !Object.values(Role).includes(role)) {
        return res.status(400).json({ message: 'Role inválida' })
      }

      const user = await this.userService.create({
        nome,
        email,
        senha,
        role,
      })

      return res.status(201).json(user)
    } catch (error: any) {
      if (error.message === 'E-mail já cadastrado') {
        return res.status(409).json({ message: 'E-mail já cadastrado' })
      }

      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }

  @ApiAuth()
  @ApiResponse(200, 'Lista de usuários')
  async findAll(req: Request, res: Response) {
    const users = await this.userService.findAll()
    return res.json(users)
  }

  @ApiAuth()
  @ApiResponse(200, 'Usuário encontrado')
  @ApiResponse(404, 'Usuário não encontrado')
  async findById(req: Request, res: Response) {
    try {
      const user = await this.userService.findById(Number(req.params.id))
      return res.json(user)
    } catch (error: any) {
      return res.status(404).json({ message: error.message })
    }
  }

  // ✅ ROTA NOVA: ME
  @ApiAuth()
  @ApiResponse(200, 'Dados do usuário logado')
  @ApiResponse(404, 'Usuário não encontrado')
  async me(req: Request, res: Response) {
    try {
      const userId = req.user?.id

      if (!userId) {
        return res.status(401).json({ message: 'Token inválido' })
      }

      const user = await this.userService.findById(Number(userId))
      return res.json(user)
    } catch (error: any) {
      return res.status(404).json({ message: error.message })
    }
  }

  @ApiAuth()
  @ApiResponse(200, 'Usuário atualizado')
  @ApiResponse(404, 'Usuário não encontrado')
  async update(req: Request, res: Response) {
    try {
      const user = await this.userService.update(
        Number(req.params.id),
        req.body
      )
      return res.json(user)
    } catch (error: any) {
      return res.status(404).json({ message: error.message })
    }
  }

  @ApiAuth()
  @ApiResponse(200, 'Usuário removido')
  @ApiResponse(404, 'Usuário não encontrado')
  async delete(req: Request, res: Response) {
    try {
      await this.userService.delete(Number(req.params.id))
      return res.status(200).json({ message: 'Usuário removido com sucesso' })
    } catch (error: any) {
      return res.status(404).json({ message: error.message })
    }
  }
}
