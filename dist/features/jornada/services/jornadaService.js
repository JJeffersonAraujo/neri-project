var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { prisma } from '../../../shared/database/prismaClient.js';
import { JornadaCalculoService } from './jornadaCalculoService.js';
import { LogExecution } from '../../../shared/decorators/LogExecution.js';
export class JornadaService {
    calculoService;
    constructor() {
        this.calculoService = new JornadaCalculoService();
    }
    // Registrar execução da jornada
    async registrarExecucao(data) {
        const escalaId = Number(data.escalaId);
        const escala = await prisma.escala.findUnique({
            where: { id: escalaId }
        });
        if (!escala) {
            throw new Error('Escala não encontrada');
        }
        const inicioExecutado = new Date(data.inicioExecutado);
        const fimExecutado = new Date(data.fimExecutado);
        // Salva jornada executada
        const jornadaExecutada = await prisma.jornadaExecutada.create({
            data: {
                escalaId,
                inicioExecutado,
                fimExecutado
            }
        });
        // Calcula jornada (NOMES CORRETOS DO SCHEMA)
        const calculo = this.calculoService.calcular({
            inicioPlanejado: escala.dataInicio,
            fimPlanejado: escala.dataFim,
            inicioExecutado,
            fimExecutado
        });
        // Salva jornada calculada
        const jornadaCalculada = await prisma.jornadaCalculada.create({
            data: {
                escalaId,
                minutosTrabalhados: calculo.minutosTrabalhados,
                minutosAtraso: calculo.minutosAtraso,
                minutosExtras: calculo.minutosExtras,
                minutosNoturnos: calculo.minutosNoturnos
            }
        });
        return { jornadaExecutada, jornadaCalculada };
    }
    // Listar todas
    async listarTodas() {
        return prisma.jornadaExecutada.findMany({
            include: { escala: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    // Buscar por ID
    async buscarPorId(id) {
        return prisma.jornadaExecutada.findUnique({
            where: { id },
            include: { escala: true }
        });
    }
    // Atualizar
    async atualizar(id, data) {
        const jornada = await prisma.jornadaExecutada.findUnique({
            where: { id }
        });
        if (!jornada) {
            throw new Error('Jornada não encontrada');
        }
        const escala = await prisma.escala.findUnique({
            where: { id: jornada.escalaId }
        });
        if (!escala) {
            throw new Error('Escala não encontrada');
        }
        const jornadaAtualizada = await prisma.jornadaExecutada.update({
            where: { id },
            data
        });
        const calculo = this.calculoService.calcular({
            inicioPlanejado: escala.dataInicio,
            fimPlanejado: escala.dataFim,
            inicioExecutado: data.inicioExecutado,
            fimExecutado: data.fimExecutado
        });
        await prisma.jornadaCalculada.updateMany({
            where: { escalaId: jornada.escalaId },
            data: {
                minutosTrabalhados: calculo.minutosTrabalhados,
                minutosAtraso: calculo.minutosAtraso,
                minutosExtras: calculo.minutosExtras,
                minutosNoturnos: calculo.minutosNoturnos
            }
        });
        return jornadaAtualizada;
    }
    // Deletar
    async deletar(id) {
        const jornada = await prisma.jornadaExecutada.findUnique({
            where: { id }
        });
        if (!jornada) {
            throw new Error('Jornada não encontrada');
        }
        await prisma.jornadaCalculada.deleteMany({
            where: { escalaId: jornada.escalaId }
        });
        await prisma.jornadaExecutada.delete({
            where: { id }
        });
    }
}
__decorate([
    LogExecution()
], JornadaService.prototype, "registrarExecucao", null);
__decorate([
    LogExecution()
], JornadaService.prototype, "listarTodas", null);
__decorate([
    LogExecution()
], JornadaService.prototype, "buscarPorId", null);
__decorate([
    LogExecution()
], JornadaService.prototype, "atualizar", null);
__decorate([
    LogExecution()
], JornadaService.prototype, "deletar", null);
