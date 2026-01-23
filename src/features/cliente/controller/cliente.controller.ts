import { Request, Response } from 'express'
import { CreateClienteDTO } from '../dtos/cliente.dtos.js'
import { clienteService } from '../services/cliente.services.js'

export class ClienteController {
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

  async findById(req: Request, res: Response) {
  const { id } = req.params

  const user = await clienteService.findById(id)

  if (!user) {
    return res.status(404).json({
      message: 'Usuário não encontrado'
    })
  }

  return res.json(user)
  //return prisma.user.findUnique({ where: { id } })
}

async update(req: Request, res: Response) {
  const { id } = req.params
  const data = req.body

  const cliente = await clienteService.update(id, data)

  if (!cliente) {
    return res.status(404).json({
      message: 'Cliente não encontrado',
    })
  }

  return res.json({
    message: 'Cliente atualizado',
    data: cliente,
  })

}

  async delete(req: Request<{ id: string }>, res: Response) {
    await clienteService.delete(req.params.id)
    return res.status(204).send()
  }
}
