// src/features/jornada/repositories/jornadaRepository.ts
import { prisma } from '../../../shared/database/prismaClient.js'

export class JornadaRepository {
  // Busca uma escala pelo ID
  async buscarEscalaPorId(escalaId: number) {
    return prisma.escala.findUnique({
      where: { id: escalaId },
    })
  }

  // Salva a execução da jornada
  async salvarJornadaExecutada(data: {
    escalaId: number
    inicioExecutado: Date
    fimExecutado: Date
  }) {
    return prisma.jornadaExecutada.create({
      data,
    })
  }

  // Salva o cálculo da jornada
  async salvarJornadaCalculada(data: {
    escalaId: number
    minutosTrabalhados: number
    minutosAtraso: number
    minutosExtras: number
    minutosNoturnos: number
  }) {
    return prisma.jornadaCalculada.create({
      data,
    })
  }

  // Listar todas as jornadas executadas
  async listarTodasJornadas() {
    return prisma.jornadaExecutada.findMany({
      include: { escala: true },
      orderBy: { createdAt: 'desc' },
    })
  }

  // Buscar uma jornada executada pelo ID
  async buscarPorId(id: number) {
    return prisma.jornadaExecutada.findUnique({
      where: { id },
      include: { escala: true },
    })
  }

  // Atualizar uma jornada executada
  async atualizar(id: number, data: { inicioExecutado: Date; fimExecutado: Date }) {
    return prisma.jornadaExecutada.update({
      where: { id },
      data,
    })
  }

  // Deletar uma jornada executada
  async deletar(id: number) {
    return prisma.jornadaExecutada.delete({
      where: { id },
    })
  }
}
