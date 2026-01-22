import { AdminService } from '../services/admin.services.js';
export class AdminController {
    async create(req, res) {
        const admin = await AdminService.create(req.body);
        return res.status(201).json(admin);
    }
    async findAll(req, res) {
        return res.json(await AdminService.findAll());
    }
    async findById(req, res) {
        return res.json(await AdminService.findById(req.params.id));
    }
    async update(req, res) {
        return res.json(await AdminService.update(req.params.id, req.body));
    }
    async delete(req, res) {
        await AdminService.delete(req.params.id);
        return res.status(204).send();
    }
}
