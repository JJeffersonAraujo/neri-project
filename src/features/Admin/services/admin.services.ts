import { IUser, ICreateUserPayload, IUpdateUserPayload } from '../types/admin.types.js'

export class AdminService {
  static async create(data: ICreateUserPayload): Promise<{ message: string; data: ICreateUserPayload }> {
    return { message: 'Admin criado', data }
  }

  static async findAll(): Promise<IUser[]> {
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
