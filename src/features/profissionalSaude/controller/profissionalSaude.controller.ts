import { Request, Response } from 'express'
import { profissionalSaudeService } from '../services/profissionalSaude.services'
import { CreateProfissionalSaudeDTO } from '../dtos/profissionalSaude.dtos'

export class profissionalSaudeController {
  async create(
    req: Request<{}, {}, CreateProfissionalSaudeDTO>,
    res: Response
  ) {
    const profissionalSaude = await profissionalSaudeService.create(req.body)
    return res.status(201).json(profissionalSaude)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await profissionalSaudeService.findAll())
  }

  async findById(req: Request<{ id: string }>, res: Response) {
    return res.json(await profissionalSaudeService.findById(req.params.id))
  }

  async update(req: Request<{ id: string }>, res: Response) {
    return res.json(await profissionalSaudeService.update(req.params.id, req.body))
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    await profissionalSaudeService.delete(req.params.id)
    return res.status(204).send()
  }
}
