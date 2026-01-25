// src/features/jornada/controllers/jornadaController.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags
} from 'tsoa'

import { JornadaService } from '../services/jornadaService.js'
import type { RegistrarExecucaoDTO } from '../dtos/registrarExecucaoDTO.js'
import type { UpdateExecucaoDTO } from '../dtos/updateExecucaoDTO.js'


@Route('jornadas')
@Tags('Jornada')
@Security('bearerAuth')
export class JornadaController extends Controller {
  private readonly jornadaService: JornadaService

  constructor() {
    super()
    this.jornadaService = new JornadaService()
  }

  // ==========================
  // Registrar execução
  // ==========================
  @SuccessResponse('201', 'Jornada registrada com sucesso')
  @Response('400', 'Dados inválidos')
  @Post()
  public async registrar(
    @Body() body: RegistrarExecucaoDTO
  ) {
    return this.jornadaService.registrarExecucao(body)
  }

  // ==========================
  // Listar todas as jornadas
  // ==========================
  @Get()
  public async listarTodas() {
    return this.jornadaService.listarTodas()
  }

  // ==========================
  // Buscar jornada por ID
  // ==========================
  @Response('404', 'Jornada não encontrada')
  @Get('{id}')
  public async buscarPorId(
    @Path() id: number
  ) {
    const jornada = await this.jornadaService.buscarPorId(id)

    if (!jornada) {
      this.setStatus(404)
      return
    }

    return jornada
  }

  // ==========================
  // Atualizar jornada
  // ==========================
  @Response('400', 'Dados inválidos')
  @Put('{id}')
  public async atualizar(
    @Path() id: number,
    @Body() body: UpdateExecucaoDTO
  ) {
    return this.jornadaService.atualizar(id, {
      inicioExecutado: new Date(body.inicioExecutado),
      fimExecutado: new Date(body.fimExecutado),
    })
  }

  // ==========================
  // Deletar jornada
  // ==========================
  @SuccessResponse('204', 'Jornada removida')
  @Delete('{id}')
  public async deletar(
    @Path() id: number
  ): Promise<void> {
    await this.jornadaService.deletar(id)
  }
}
