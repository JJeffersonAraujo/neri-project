import { Request, Response } from 'express'
import { CreateAdminDTO } from '../dtos/admin.dtos.js'
import { AdminService } from '../services/admin.services.js'


export class AdminController {
  async create(
    req: Request<{}, {}, CreateAdminDTO>,
    res: Response
  ) {
    const admin = await AdminService.create(req.body)
    return res.status(201).json(admin)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await AdminService.findAll())
  }

  async findById(req: Request, res: Response) {
  const { id } = req.params

  const user = await AdminService.findById(id)

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

  const admin = await AdminService.update(id, data)

  if (!admin) {
    return res.status(404).json({
      message: 'Admin não encontrado',
    })
  }

  return res.json({
    message: 'Admin atualizado',
    data: admin,
  })

}

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const deleted = await AdminService.delete(id)

    if (!deleted) {
      return res.status(404).json({
        message: 'Admin não encontrado',
      })
    }

    return res.status(204).send({
      message: 'Admin removido',
    })
  }
}
