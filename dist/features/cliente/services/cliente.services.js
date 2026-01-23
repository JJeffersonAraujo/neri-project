export class clienteService {
    static async create(data) {
        return { message: 'Cliente criado', data };
    }
    static async findAll() {
        return [
            {
                id: '1',
                name: 'Cliente Teste',
                email: 'cliente@teste.com',
                password: 'hashed_password',
                role: 'clientes',
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
