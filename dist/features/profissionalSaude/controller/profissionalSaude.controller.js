import { profissionalSaudeService } from '../services/profissionalSaude.services';
export class profissionalSaudeController {
    async create(req, res) {
        const profissionalSaude = await profissionalSaudeService.create(req.body);
        return res.status(201).json(profissionalSaude);
    }
    async findAll(req, res) {
        return res.json(await profissionalSaudeService.findAll());
    }
    async findById(req, res) {
        return res.json(await profissionalSaudeService.findById(req.params.id));
    }
    async update(req, res) {
        return res.json(await profissionalSaudeService.update(req.params.id, req.body));
    }
    async delete(req, res) {
        await profissionalSaudeService.delete(req.params.id);
        return res.status(204).send();
    }
}
