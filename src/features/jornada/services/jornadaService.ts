import { prisma } from '../../../shared/database/prismaClient.js'
import { JornadaCalculoService } from './jornadaCalculoService.js'
import { RegistrarExecucaoDTO } from '../dtos/registrarExecucaoDTO.js'
import { LogExecution } from '../../../shared/decorators/LogExecution.js'

export class JornadaService {
  private readonly calculoService: JornadaCalculoService

  constructor() {
    this.calculoService = new JornadaCalculoService()
  }

  // Registrar execução da jornada
  @LogExecution()
  async registrarExecucao(data: RegistrarExecucaoDTO) {
    const escalaId = Number(data.escalaId)

    const escala = await prisma.escala.findUnique({
      where: { id: escalaId }
    })

    if (!escala) {
      throw new Error('Escala não encontrada')
    }

    const inicioExecutado = new Date(data.inicioExecutado)
    const fimExecutado = new Date(data.fimExecutado)

    // Salva jornada executada
    const jornadaExecutada = await prisma.jornadaExecutada.create({
      data: {
        escalaId,
        inicioExecutado,
        fimExecutado
      }
    })

    // Calcula jornada (NOMES CORRETOS DO SCHEMA)
    const calculo = this.calculoService.calcular({
      inicioPlanejado: escala.dataInicio,
      fimPlanejado: escala.dataFim,
      inicioExecutado,
      fimExecutado
    })

    // Salva jornada calculada
    const jornadaCalculada = await prisma.jornadaCalculada.create({
      data: {
        escalaId,
        minutosTrabalhados: calculo.minutosTrabalhados,
        minutosAtraso: calculo.minutosAtraso,
        minutosExtras: calculo.minutosExtras,
        minutosNoturnos: calculo.minutosNoturnos
      }
    })

    return { jornadaExecutada, jornadaCalculada }
  }

  // Listar todas
  @LogExecution()
  async listarTodas() {
    return prisma.jornadaExecutada.findMany({
      include: { escala: true },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Buscar por ID
  @LogExecution()
  async buscarPorId(id: number) {
    return prisma.jornadaExecutada.findUnique({
      where: { id },
      include: { escala: true }
    })
  }

  // Atualizar
  @LogExecution()
  async atualizar(
    id: number,
    data: { inicioExecutado: Date; fimExecutado: Date }
  ) {
    const jornada = await prisma.jornadaExecutada.findUnique({
      where: { id }
    })

    if (!jornada) {
      throw new Error('Jornada não encontrada')
    }

    const escala = await prisma.escala.findUnique({
      where: { id: jornada.escalaId }
    })

    if (!escala) {
      throw new Error('Escala não encontrada')
    }

    const jornadaAtualizada = await prisma.jornadaExecutada.update({
      where: { id },
      data
    })

    const calculo = this.calculoService.calcular({
      inicioPlanejado: escala.dataInicio,
      fimPlanejado: escala.dataFim,
      inicioExecutado: data.inicioExecutado,
      fimExecutado: data.fimExecutado
    })

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

  // Deletar
  @LogExecution()
  async deletar(id: number): Promise<void> {
    const jornada = await prisma.jornadaExecutada.findUnique({
      where: { id }
    })

    if (!jornada) {
      throw new Error('Jornada não encontrada')
    }

    await prisma.jornadaCalculada.deleteMany({
      where: { escalaId: jornada.escalaId }
    })

    await prisma.jornadaExecutada.delete({
      where: { id }
    })
  }
}
