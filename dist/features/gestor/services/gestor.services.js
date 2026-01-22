export class gestorService {
    static async create(data) {
        return { message: 'Gestor criado', data };
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
