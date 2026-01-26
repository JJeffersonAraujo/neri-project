import { Request, Response } from 'express'
import { profissionalService } from '../services/profissionalSaude.services.js'

export class profissionalController {
  async create(req: Request, res: Response) {
    const profissionalSaude = await profissionalService.create(req.body)
    return res.status(201).json(profissionalSaude)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await profissionalService.findAll())
  }

  async findById(req: Request, res: Response) {
    const profissionalSaude = await profissionalService.findById(req.params.id)
    if (!profissionalSaude) {
      return res.status(404).json({ message: 'Profissional de saúde não encontrado' })
    }

    return res.json(profissionalSaude)
  }

  async update(req: Request, res: Response) {
    const profissionalSaude = await profissionalService.update(req.params.id, req.body)

    if (!profissionalSaude) {
      return res.status(404).json({ message: 'Profissional de saúde não encontrado' })
    }

    return res.json({ message: 'Profissional de saúde atualizado', data: profissionalSaude })
  }

  async delete(req: Request, res: Response) {
    const deleted = await profissionalService.delete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Profissional de saúde não encontrado' })
    }

    return res.status(204).send()
  }
}
