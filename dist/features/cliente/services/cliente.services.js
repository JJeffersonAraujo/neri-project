export class clienteService {
    static async create(data) {
        return { message: 'Cliente criado', data };
    }
    static async findAll() {
        return [];
    }
    static async findById(id) {
        return null;
    }
    static async update(id, data) {
        return { id, data };
    }
    static async delete(id) {
        return;
    }
}
