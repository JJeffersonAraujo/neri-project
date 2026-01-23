// src/features/jornada/controllers/jornadaController.ts
import { Request, Response } from 'express'
import { JornadaService } from '../services/jornadaService.js'
import { registrarExecucaoDTO } from '../dtos/registrarExecucaoDTO.js'

import {
  ApiTag,
  ApiResponse,
  ApiBody,
  ApiAuth
} from '../../../shared/decorators/swagger/index.js'

@ApiTag('Jornadas')
export class JornadaController {
  private jornadaService: JornadaService

  constructor() {
    this.jornadaService = new JornadaService()
  }

  // Registrar execução de jornada
  @ApiAuth()
  @ApiBody(registrarExecucaoDTO)
  @ApiResponse(201, 'Jornada registrada com sucesso')
  @ApiResponse(400, 'Dados obrigatórios não informados')
  async registrar(req: Request, res: Response): Promise<Response> {
    try {
      const parseResult = registrarExecucaoDTO.safeParse(req.body)

      if (!parseResult.success) {
        return res.status(400).json({
          message: 'Dados obrigatórios não informados',
          errors: parseResult.error.format()
        })
      }

      const resultado = await this.jornadaService.registrarExecucao(parseResult.data)
      return res.status(201).json(resultado)
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }

  // Listar todas as jornadas
  @ApiAuth()
  @ApiResponse(200, 'Lista de jornadas')
  async listarTodas(req: Request, res: Response): Promise<Response> {
    try {
      const jornadas = await this.jornadaService.listarTodas()
      return res.status(200).json(jornadas)
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }

  // Buscar jornada por ID
  @ApiAuth()
  @ApiResponse(200, 'Jornada encontrada')
  @ApiResponse(404, 'Jornada não encontrada')
  async buscarPorId(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const jornada = await this.jornadaService.buscarPorId(id)

      if (!jornada) {
        return res.status(404).json({ message: 'Jornada não encontrada' })
      }

      return res.status(200).json(jornada)
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }

  // Atualizar jornada
  @ApiAuth()
  @ApiResponse(200, 'Jornada atualizada')
  @ApiResponse(400, 'Erro na atualização')
  async atualizar(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const { inicioExecutado, fimExecutado } = req.body

      if (!inicioExecutado || !fimExecutado) {
        return res.status(400).json({ message: 'Dados obrigatórios não informados' })
      }

      const jornadaAtualizada = await this.jornadaService.atualizar(id, {
        inicioExecutado: new Date(inicioExecutado),
        fimExecutado: new Date(fimExecutado)
      })

      return res.status(200).json(jornadaAtualizada)
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }

  // Deletar jornada
  @ApiAuth()
  @ApiResponse(204, 'Jornada deletada')
  async deletar(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      await this.jornadaService.deletar(id)
      return res.status(204).send()
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
}
