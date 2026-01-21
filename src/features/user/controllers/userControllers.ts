import { Request, Response } from 'express'
import {  gestorService, profissionalSaudeService, clienteService } from '../../user/services/userServices'
import { ValidationService } from '../services/validationService'



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


