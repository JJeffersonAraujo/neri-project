import { Request, Response } from 'express'
import { profissionalSaudeService } from '../services/profissionalSaude.services.js'
import { CreateProfissionalSaudeDTO } from '../dtos/profissionalSaude.dtos.js'

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

   async findById(req: Request, res: Response) {
   const { id } = req.params

   const user = await profissionalSaudeService.findById(id)

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
  
    const profissionalSaude = await profissionalSaudeService.update(id, data)

    if (!profissionalSaude) {
      return res.status(404).json({
        message: 'Cliente não encontrado',
      })
    }
  
    return res.json({
      message: 'Profissional de saúde atualizado',
      data: profissionalSaude,
    })
  
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    await profissionalSaudeService.delete(req.params.id)
    return res.status(204).send()
  }
}
