export class profissionalSaudeService {
    static async create(data) {
        return { message: 'Profissional de saúde criado', data };
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
