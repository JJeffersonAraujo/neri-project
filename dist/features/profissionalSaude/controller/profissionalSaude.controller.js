import { profissionalService } from '../services/profissionalSaude.services.js';
export class profissionalController {
    async create(req, res) {
        const profissionalSaude = await profissionalService.create(req.body);
        return res.status(201).json(profissionalSaude);
    }
    async findAll(req, res) {
        return res.json(await profissionalService.findAll());
    }
    async findById(req, res) {
        const profissionalSaude = await profissionalService.findById(req.params.id);
        if (!profissionalSaude) {
            return res.status(404).json({ message: 'Profissional de saúde não encontrado' });
        }
        return res.json(profissionalSaude);
    }
    async update(req, res) {
        const profissionalSaude = await profissionalService.update(req.params.id, req.body);
        if (!profissionalSaude) {
            return res.status(404).json({ message: 'Profissional de saúde não encontrado' });
        }
        return res.json({ message: 'Profissional de saúde atualizado', data: profissionalSaude });
    }
    async delete(req, res) {
        const deleted = await profissionalService.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Profissional de saúde não encontrado' });
        }
        return res.status(204).send();
    }
}
