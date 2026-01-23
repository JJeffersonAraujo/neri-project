import { IUser, ICreateUserPayload, IUpdateUserPayload } from '../types/cliente.types.js'

export class clienteService {
  static async create(data: ICreateUserPayload): Promise<{ message: string; data: ICreateUserPayload }> {
    return { message: 'Cliente criado', data }
  }

  static async findAll(): Promise<IUser[]> {
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
    ]
  }

  static async findById(id: string): Promise<IUser | null> {
    return null
  }

  static async update(id: string, data: IUpdateUserPayload): Promise<{ id: string; data: IUpdateUserPayload }> {
    return { id, data }
  }

  static async delete(id: string): Promise<void> {
    return
  }
}