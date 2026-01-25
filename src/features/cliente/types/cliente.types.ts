import { Role } from '@prisma/client'

export interface ICreateUserPayload {
  name: string
  email: string
  password: string
}

export interface IUpdateUserPayload {
  name?: string
  email?: string
  password?: string
}

export interface IUser {
  id: number
  nome: string
  email: string
  senhaHash: string
  role: Role
  createdAt: Date
  updatedAt: Date
}