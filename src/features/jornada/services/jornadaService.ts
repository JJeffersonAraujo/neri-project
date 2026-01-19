// src/features/jornada/services/jornadaService.ts
import { prisma } from '../../../shared/database/prismaClient.js'
import { JornadaCalculoService } from './jornadaCalculoService.js'
import { RegistrarExecucaoDTO } from '../../jornada/dtos/registrarExecucaoDTO.js'

export class JornadaService {
  private calculoService: JornadaCalculoService

  constructor() {
    this.calculoService = new JornadaCalculoService()
  }

  // Registrar execução da jornada
  async registrarExecucao(data: RegistrarExecucaoDTO) {
    const escala = await prisma.escala.findUnique({
      where: { id: data.escalaId }
    })

    if (!escala) {
      throw new Error('Escala não encontrada')
    }

    const inicioExecutado = new Date(data.inicioExecutado)
    const fimExecutado = new Date(data.fimExecutado)

    // Salvar execução
    const jornadaExecutada = await prisma.jornadaExecutada.create({
      data: {
        escalaId: data.escalaId,
        inicioExecutado,
        fimExecutado
      }
    })

    // Calcular jornada
    const calculo = this.calculoService.calcular({
      inicioPlanejado: escala.dataInicio,
      fimPlanejado: escala.dataFim,
      inicioExecutado,
      fimExecutado
    })

    // Salvar jornada calculada
    const jornadaCalculada = await prisma.jornadaCalculada.create({
      data: {
        escalaId: data.escalaId,
        minutosTrabalhados: calculo.minutosTrabalhados,
        minutosAtraso: calculo.minutosAtraso,
        minutosExtras: calculo.minutosExtras,
        minutosNoturnos: calculo.minutosNoturnos
      }
    })

    return { jornadaExecutada, jornadaCalculada }
  }

  // Listar todas as jornadas executadas
  async listarTodas() {
    return prisma.jornadaExecutada.findMany({
      include: {
        escala: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Buscar jornada por ID
  async buscarPorId(id: number) {
    return prisma.jornadaExecutada.findUnique({
      where: { id },
      include: {
        escala: true
      }
    })
  }

  // Atualizar uma execução de jornada
  async atualizar(
    id: number,
    data: { inicioExecutado: Date; fimExecutado: Date }
  ) {
    const jornada = await prisma.jornadaExecutada.findUnique({ where: { id } })
    if (!jornada) throw new Error('Jornada não encontrada')

    const escala = await prisma.escala.findUnique({
      where: { id: jornada.escalaId }
    })
    if (!escala) throw new Error('Escala não encontrada')

    // Atualiza execução
    const jornadaAtualizada = await prisma.jornadaExecutada.update({
      where: { id },
      data
    })

    // Recalcula jornada
    const calculo = this.calculoService.calcular({
      inicioPlanejado: escala.dataInicio,
      fimPlanejado: escala.dataFim,
      inicioExecutado: data.inicioExecutado,
      fimExecutado: data.fimExecutado
    })

    // Atualiza jornada calculada
    await prisma.jornadaCalculada.updateMany({
      where: { escalaId: jornada.escalaId },
      data: {
        minutosTrabalhados: calculo.minutosTrabalhados,
        minutosAtraso: calculo.minutosAtraso,
        minutosExtras: calculo.minutosExtras,
        minutosNoturnos: calculo.minutosNoturnos
      }
    })

    return jornadaAtualizada
  }

  // Deletar execução de jornada
  async deletar(id: number) {
    const jornada = await prisma.jornadaExecutada.findUnique({ where: { id } })
    if (!jornada) throw new Error('Jornada não encontrada')

    // Deleta execução e calculada
    await prisma.jornadaCalculada.deleteMany({ where: { escalaId: jornada.escalaId } })
    await prisma.jornadaExecutada.delete({ where: { id } })
  }
}
