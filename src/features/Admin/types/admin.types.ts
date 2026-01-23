export interface ICreateUserPayload {
  name: string
  email: string
  password: string
}

export interface IUpdateUserPayload {
  name?: string
  email?: string
  password?: string
  role: 'admin'
}

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
}
