import { Request, Response } from 'express'
import { clienteService } from '../services/cliente.services'
import { CreateClienteDTO } from '../dtos/cliente.dtos'

export class AdminController {
  async create(
    req: Request<{}, {}, CreateClienteDTO>,
    res: Response
  ) {
    const cliente = await clienteService.create(req.body)
    return res.status(201).json(cliente)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await clienteService.findAll())
  }

  async findById(req: Request<{ id: string }>, res: Response) {
    return res.json(await clienteService.findById(req.params.id))
  }

  async update(req: Request<{ id: string }>, res: Response) {
    return res.json(await clienteService.update(req.params.id, req.body))
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    await clienteService.delete(req.params.id)
    return res.status(204).send()
  }
}
