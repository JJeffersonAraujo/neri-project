import { clienteService } from '../services/cliente.services';
export class ClienteController {
    async create(req, res) {
        const cliente = await clienteService.create(req.body);
        return res.status(201).json(cliente);
    }
    async findAll(req, res) {
        return res.json(await clienteService.findAll());
    }
    async findById(req, res) {
        return res.json(await clienteService.findById(req.params.id));
    }
    async update(req, res) {
        return res.json(await clienteService.update(req.params.id, req.body));
    }
    async delete(req, res) {
        await clienteService.delete(req.params.id);
        return res.status(204).send();
    }
}
