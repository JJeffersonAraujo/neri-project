import { Request, Response } from 'express'
import { clienteService } from '../services/cliente.services.js'

export class ClienteController {
  async create(req: Request, res: Response) {
    const cliente = await clienteService.create(req.body)
    return res.status(201).json(cliente)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await clienteService.findAll())
  }

  async findById(req: Request, res: Response) {
    const cliente = await clienteService.findById(req.params.id)

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' })
    }

    return res.json(cliente)
  }

  async update(req: Request, res: Response) {
    const cliente = await clienteService.update(req.params.id, req.body)

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' })
    }

    return res.json({ message: 'Cliente atualizado', data: cliente })
  }

  async delete(req: Request, res: Response) {
    const deleted = await clienteService.delete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Cliente não encontrado' })
    }

    return res.status(204).send()
  }
}