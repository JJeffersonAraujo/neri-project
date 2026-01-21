export interface CreateUserDTO {
  nome: string
  email: string
  senha: string
  role?: 'ADMIN' | 'GESTOR' | 'PROFISSIONAL' | 'USER'
}
