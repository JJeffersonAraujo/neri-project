import { Request, Response } from 'express'
import { AdminService } from '../services/admin.services.js'

export class AdminController {
  async create(req: Request, res: Response) {
    const admin = await AdminService.create(req.body)
    return res.status(201).json(admin)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await AdminService.findAll())
  }

  async findById(req: Request, res: Response) {
    const admin = await AdminService.findById(req.params.id)

    if (!admin) {
      return res.status(404).json({ message: 'Admin não encontrado' })
    }

    return res.json(admin)
  }

  async update(req: Request, res: Response) {
    const admin = await AdminService.update(req.params.id, req.body)

    if (!admin) {
      return res.status(404).json({ message: 'Admin não encontrado' })
    }

    return res.json({ message: 'Admin atualizado', data: admin })
  }

  async delete(req: Request, res: Response) {
    const deleted = await AdminService.delete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ message: 'Admin não encontrado' })
    }

    return res.status(204).send()
  }
}