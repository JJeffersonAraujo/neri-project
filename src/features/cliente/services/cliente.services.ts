import { IUser, ICreateUserPayload, IUpdateUserPayload } from '../types/cliente.types.js'

export class clienteService {
  static async create(data: ICreateUserPayload): Promise<{ message: string; data: ICreateUserPayload }> {
    return { message: 'Cliente criado', data }
  }

  static async findAll(): Promise<IUser[]> {
    return []
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