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
  if (id !== '1') {
    return null
  }

  return {
        id: '1',
        name: 'Admin Teste',
        email: 'admin@teste.com',
      }
}


   static async update(id: string, data: IUpdateUserPayload): Promise<{ id: string; data: IUpdateUserPayload } | null> {
     // simulação de banco
     if (id !== '1') {
       return null
     }
 
     return {
       id: '1',
       data: {
         name: data.name ?? 'Admin Teste',
         email: data.email ?? 'admin@teste.com',
         role: data.role ?? 'admin',
       },
     }
   }

  static async delete(id: string): Promise<void> {
    return
  }
}
