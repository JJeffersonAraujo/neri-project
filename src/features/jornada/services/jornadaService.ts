import { prisma } from '../../../shared/database/prismaClient.js'
import { JornadaCalculoService } from './jornadaCalculoService.js'
import type { RegistrarExecucaoDTO } from '../dtos/registrarExecucaoDTO.js'
import { LogExecution } from '../../../shared/decorators/LogExecution.js'

export class JornadaService {
  private readonly calculoService = new JornadaCalculoService()

  constructor() {
    this.calculoService = new JornadaCalculoService()
  }

  @LogExecution()
  async registrarExecucao(data: RegistrarExecucaoDTO) {
    const escalaId = Number(data.escalaId)

    const escala = await prisma.escala.findUnique({
      where: { id: escalaId },
    })

    if (!escala) {
      throw new Error('Escala não encontrada')
    }

    const inicioExecutado = new Date(data.inicioExecutado)
    const fimExecutado = new Date(data.fimExecutado)

    const jornadaExecutada = await prisma.jornadaExecutada.create({
      data: {
        escalaId,
        inicioExecutado,
        fimExecutado,
      },
    })

    const calculo = this.calculoService.calcular({
      inicioPlanejado: escala.dataInicio,
      fimPlanejado: escala.dataFim,
      inicioExecutado,
      fimExecutado,
    })

    const jornadaCalculada = await prisma.jornadaCalculada.create({
      data: {
        escalaId,
        minutosTrabalhados: calculo.minutosTrabalhados,
        minutosAtraso: calculo.minutosAtraso,
        minutosExtras: calculo.minutosExtras,
        minutosNoturnos: calculo.minutosNoturnos,
      },
    })

    return { jornadaExecutada, jornadaCalculada }
  }

  @LogExecution()
  async listarTodas() {
    return prisma.jornadaExecutada.findMany({
      include: { escala: true },
      orderBy: { createdAt: 'desc' },
    })
  }

  @LogExecution()
  async buscarPorId(id: number) {
    return prisma.jornadaExecutada.findUnique({
      where: { id },
      include: { escala: true },
    })
  }

  @LogExecution()
  async atualizar(
    id: number,
    data: { inicioExecutado: Date; fimExecutado: Date }
  ) {
    const jornada = await prisma.jornadaExecutada.findUnique({
      where: { id },
    })

    if (!jornada) {
      throw new Error('Jornada não encontrada')
    }

    const escala = await prisma.escala.findUnique({
      where: { id: jornada.escalaId },
    })

    if (!escala) {
      throw new Error('Escala não encontrada')
    }

    const jornadaAtualizada = await prisma.jornadaExecutada.update({
      where: { id },
      data,
    })

    const calculo = this.calculoService.calcular({
      inicioPlanejado: escala.dataInicio,
      fimPlanejado: escala.dataFim,
      inicioExecutado: data.inicioExecutado,
      fimExecutado: data.fimExecutado,
    })

    await prisma.jornadaCalculada.updateMany({
      where: { escalaId: jornada.escalaId },
      data: {
        minutosTrabalhados: calculo.minutosTrabalhados,
        minutosAtraso: calculo.minutosAtraso,
        minutosExtras: calculo.minutosExtras,
        minutosNoturnos: calculo.minutosNoturnos,
      },
    })

    return jornadaAtualizada
  }

  @LogExecution()
  async deletar(id: number): Promise<void> {
    const jornada = await prisma.jornadaExecutada.findUnique({
      where: { id },
    })

    if (!jornada) {
      throw new Error('Jornada não encontrada')
    }

    await prisma.jornadaCalculada.deleteMany({
      where: { escalaId: jornada.escalaId },
    })

    await prisma.jornadaExecutada.delete({
      where: { id },
    })
  }
}
