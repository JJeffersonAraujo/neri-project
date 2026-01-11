import { jwtConfig } from '../../../shared/utils/jwt.util'


export class AdminService {
  static async create(data: any) {
    return { message: 'Admin criado', data }
  }

  static async findAll() {
    return []
  }

  static async findById(id: string) {
    return { id }
  }

  static async update(id: string, data: any) {
    return { id, data }
  }

  static async delete(id: string) {
    return
  }
}

export class profissionalSaudeService {
  static async create(data: any) {
    return { message: 'Admin criado', data }
  }

  static async findAll() {
    return []
  }

  static async findById(id: string) {
    return { id }
  }

  static async update(id: string, data: any) {
    return { id, data }
  }

  static async delete(id: string) {
    return
  }
}

export class gestorService {
  static async create(data: any) {
    return { message: 'Admin criado', data }
  }

  static async findAll() {
    return []
  }

  static async findById(id: string) {
    return { id }
  }

  static async update(id: string, data: any) {
    return { id, data }
  }

  static async delete(id: string) {
    return
  }
}

export class clienteService {
  static async create(data: any) {
    return { message: 'Admin criado', data }
  }

  static async findAll() {
    return []
  }

  static async findById(id: string) {
    return { id }
  }

  static async update(id: string, data: any) {
    return { id, data }
  }

  static async delete(id: string) {
    return
  }
}