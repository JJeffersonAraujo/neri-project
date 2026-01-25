import { Request, Response } from 'express'
import { gestorService } from '../services/gestor.services.js'

export class gestorController {
  async create(req: Request, res: Response) {
    const gestor = await gestorService.create(req.body)
    return res.status(201).json(gestor)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await gestorService.findAll())
  }

  async findById(req: Request, res: Response) {
    const gestor = await gestorService.findById(req.params.id)

    if (!gestor) {
      return res.status(404).json({ message: 'Gestor não encontrado' })
    }

    return res.json(gestor)
  }

  async update(req: Request, res: Response) {
    const gestor = await gestorService.update(req.params.id, req.body)

    if (!gestor) {
      return res.status(404).json({ message: 'Gestor não encontrado' })
    }

    return res.json({ message: 'Gestor atualizado', data: gestor })
  }

  async delete(req: Request, res: Response) {
    const deleted = await gestorService.delete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Gestor não encontrado' })
    }

    return res.status(204).send()
  }
}