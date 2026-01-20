export interface ICreateUserPayload {
  name: string
  email: string
  password: string
  role: 'admin' | 'profissional_saude' | 'gestor' | 'cliente'
}

export interface IUpdateUserPayload {
  name?: string
  email?: string
  password?: string
}

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'profissional_saude' | 'gestor' | 'cliente'
  createdAt: Date
  updatedAt: Date
}
