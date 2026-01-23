export class AdminService {
    static async create(data) {
        return { message: 'Admin criado', data };
    }
    static async findAll() {
        return [
            {
                id: '1',
                name: 'Admin Teste',
                email: 'admin@teste.com',
                password: 'hashed_password',
                role: 'admin',
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
