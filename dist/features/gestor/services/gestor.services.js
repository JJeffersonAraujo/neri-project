export class gestorService {
    static async create(data) {
        return { message: 'Gestor criado', data };
    }
    static async findAll() {
        return [
            {
                id: '1',
                name: 'Gestor Teste',
                email: 'gestor@teste.com',
                password: 'hashed_password',
                role: 'gestor',
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
