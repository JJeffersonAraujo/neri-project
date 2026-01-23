import { IUser, ICreateUserPayload, IUpdateUserPayload } from '../types/gestor.types.js'

export class gestorService {
  static async create(data: ICreateUserPayload): Promise<{ message: string; data: ICreateUserPayload }> {
    return { message: 'Gestor criado', data }
  }

  static async findAll(): Promise<IUser[]> {
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