import { gestorService } from '../services/gestor.services.js';
export class gestorController {
    async create(req, res) {
        const gestor = await gestorService.create(req.body);
        return res.status(201).json(gestor);
    }
    async findAll(req, res) {
        return res.json(await gestorService.findAll());
    }
    async findById(req, res) {
        return res.json(await gestorService.findById(req.params.id));
    }
    async update(req, res) {
        return res.json(await gestorService.update(req.params.id, req.body));
    }
    async delete(req, res) {
        await gestorService.delete(req.params.id);
        return res.status(204).send();
    }
}
