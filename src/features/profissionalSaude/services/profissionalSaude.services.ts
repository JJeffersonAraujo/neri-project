import { IUser, ICreateUserPayload, IUpdateUserPayload } from '../types/profissionalSaude.types.js'

export class profissionalSaudeService {
  static async create(data: ICreateUserPayload): Promise<{ message: string; data: ICreateUserPayload }> {
    return { message: 'Profissional de saúde criado', data }
  }

  static async findAll(): Promise<IUser[]> {
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
    ]
  }

  static async findById(id: string): Promise<IUser | null> {
    return {
      id: '1',
      name: 'Profissional de Saúde Teste',
      email: 'profissional@teste.com',
      password: 'hashed_password',
      role: 'profissionalSaude',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  static async update(id: string, data: IUpdateUserPayload): Promise<{ id: string; data: IUpdateUserPayload }> {
    return { id, data }
  }

  static async delete(id: string): Promise<void> {
    return
  }
}