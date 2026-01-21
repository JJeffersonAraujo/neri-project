export interface ICreateUserPayload {
  name: string
  email: string
  password: string
  role: 'profissionalSaude'
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
  role: 'profissionalSaude'
  createdAt: Date
  updatedAt: Date
}
