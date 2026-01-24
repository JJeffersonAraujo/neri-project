import { Request, Response } from 'express'
import { gestorService } from '../services/gestor.services.js'
import { CreateGestorDTO } from '../dtos/gestor.dtos.js'

export class gestorController {
  async create(
    req: Request<{}, {}, CreateGestorDTO>,
    res: Response
  ) {
    const gestor = await gestorService.create(req.body)
    return res.status(201).json(gestor)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await gestorService.findAll())
  }

   async findById(req: Request, res: Response) {
   const { id } = req.params

   const user = await gestorService.findById(id)

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

  const gestor = await gestorService.update(id, data)

  if (!gestor) {
    return res.status(404).json({
      message: 'Gestor não encontrado',
    })
  }

  return res.json({
    message: 'Gestor atualizado',
    data: gestor,
  })

}

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const deleted = await gestorService.delete(id)

    if (!deleted) {
      return res.status(404).json({
        message: 'Gestor não encontrado',
      })
    }

    return res.status(204).send({
      message: 'Gestor removido',
    })
  }
}
