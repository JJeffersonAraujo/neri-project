import { Request, Response } from 'express'
import { UserService } from '../services/userServices.js'
import { Role } from '@prisma/client'

export class UserController {
  private userService = new UserService()

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
      return res.status(400).json({ message: error.message })
    }
  }

  async findAll(req: Request, res: Response) {
    const users = await this.userService.findAll()
    return res.json(users)
  }

  async findById(req: Request, res: Response) {
    const user = await this.userService.findById(Number(req.params.id))
    return res.json(user)
  }

  async update(req: Request, res: Response) {
    const user = await this.userService.update(
      Number(req.params.id),
      req.body
    )
    return res.json(user)
  }

  async delete(req: Request, res: Response) {
    await this.userService.delete(Number(req.params.id))
    return res.status(204).send()
  }
}
