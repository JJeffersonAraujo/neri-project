import { Request, Response } from 'express'
import { AdminService, gestorService, profissionalSaudeService, clienteService } from '../../user/services/userServices'

export class AdminController {
  async create(req: Request, res: Response) {
    const admin = await AdminService.create(req.body)
    return res.status(201).json(admin)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await AdminService.findAll())
  }

  async findById(req: Request, res: Response) {
    return res.json(await AdminService.findById(req.params.id))
  }

  async update(req: Request, res: Response) {
    return res.json(await AdminService.update(req.params.id, req.body))
  }

  async delete(req: Request, res: Response) {
    await AdminService.delete(req.params.id)
    return res.status(204).send()
  }
}

export class profissionalSaudeController {
  async create(req: Request, res: Response) {
    const admin = await profissionalSaudeService.create(req.body)
    return res.status(201).json(admin)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await AdminService.findAll())
  }

  async findById(req: Request, res: Response) {
    return res.json(await AdminService.findById(req.params.id))
  }

  async update(req: Request, res: Response) {
    return res.json(await AdminService.update(req.params.id, req.body))
  }

  async delete(req: Request, res: Response) {
    await AdminService.delete(req.params.id)
    return res.status(204).send()
  }
}

export class gestorController {
  async create(req: Request, res: Response) {
    const admin = await gestorService.create(req.body)
    return res.status(201).json(admin)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await AdminService.findAll())
  }

  async findById(req: Request, res: Response) {
    return res.json(await AdminService.findById(req.params.id))
  }

  async update(req: Request, res: Response) {
    return res.json(await AdminService.update(req.params.id, req.body))
  }

  async delete(req: Request, res: Response) {
    await AdminService.delete(req.params.id)
    return res.status(204).send()
  }
}

export class clienteController {
  async create(req: Request, res: Response) {
    const admin = await clienteService.create(req.body)
    return res.status(201).json(admin)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await AdminService.findAll())
  }

  async findById(req: Request, res: Response) {
    return res.json(await AdminService.findById(req.params.id))
  }

  async update(req: Request, res: Response) {
    return res.json(await AdminService.update(req.params.id, req.body))
  }

  async delete(req: Request, res: Response) {
    await AdminService.delete(req.params.id)
    return res.status(204).send()
  }
}
