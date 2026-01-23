export class profissionalSaudeService {
    static async create(data) {
        return { message: 'Profissional de saúde criado', data };
    }
    static async findAll() {
        return [
            {
                id: '1',
                name: 'Profissional de Saúde Teste',
                email: 'profissional@teste.com',
                password: 'hashed_password',
                role: 'profissionalSaude',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];
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
