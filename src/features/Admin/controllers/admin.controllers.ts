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

  async findById(req: Request<{ id: string }>, res: Response) {
    return res.json(await AdminService.findById(req.params.id))
  }

  async update(req: Request<{ id: string }>, res: Response) {
    return res.json(await AdminService.update(req.params.id, req.body))
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    await AdminService.delete(req.params.id)
    return res.status(204).send()
  }
}
