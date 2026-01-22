import { JornadaService } from '../services/jornadaService.js';
import { registrarExecucaoDTO } from '../../jornada/dtos/registrarExecucaoDTO.js';
export class JornadaController {
    jornadaService;
    constructor() {
        this.jornadaService = new JornadaService();
    }
    // Registrar execução de jornada
    async registrar(req, res) {
        try {
            const parseResult = registrarExecucaoDTO.safeParse(req.body);
            if (!parseResult.success) {
                return res.status(400).json({
                    message: 'Dados obrigatórios não informados',
                    errors: parseResult.error.format() // Corrigido para Zod
                });
            }
            const resultado = await this.jornadaService.registrarExecucao(parseResult.data);
            return res.status(201).json(resultado);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    // Listar todas as jornadas
    async listarTodas(req, res) {
        try {
            const jornadas = await this.jornadaService.listarTodas();
            return res.status(200).json(jornadas);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    // Buscar jornada por ID
    async buscarPorId(req, res) {
        try {
            const id = Number(req.params.id);
            const jornada = await this.jornadaService.buscarPorId(id);
            if (!jornada)
                return res.status(404).json({ message: 'Jornada não encontrada' });
            return res.status(200).json(jornada);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    // Atualizar jornada
    async atualizar(req, res) {
        try {
            const id = Number(req.params.id);
            const { inicioExecutado, fimExecutado } = req.body;
            if (!inicioExecutado || !fimExecutado) {
                return res.status(400).json({ message: 'Dados obrigatórios não informados' });
            }
            const jornadaAtualizada = await this.jornadaService.atualizar(id, {
                inicioExecutado: new Date(inicioExecutado),
                fimExecutado: new Date(fimExecutado)
            });
            return res.status(200).json(jornadaAtualizada);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    // Deletar jornada
    async deletar(req, res) {
        try {
            const id = Number(req.params.id);
            await this.jornadaService.deletar(id);
            return res.status(204).send();
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
