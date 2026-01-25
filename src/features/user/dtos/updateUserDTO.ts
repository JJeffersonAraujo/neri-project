export interface UpdateUserDTO {
  nome?: string;
  email?: string;
  senha?: string;
  role?: "ADMIN" | "GESTOR" | "PROFISSIONAL" | "USER";
}
