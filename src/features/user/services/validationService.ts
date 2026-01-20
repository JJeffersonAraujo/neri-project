import { z, ZodError } from 'zod'
import { CreateUserSchema, UpdateUserSchema, LoginUserSchema } from '../dtos/createUserDTO'

export class ValidationService {
  /**
   * Valida dados de criação de usuário
   * @param data - Dados a validar
   * @returns Dados validados e tipados
   * @throws ZodError com mensagens de erro detalhadas
   */
  static validateCreateUser(data: unknown) {
    return CreateUserSchema.parse(data)
  }

  /**
   * Valida dados com tratamento de erro customizado
   * @param data - Dados a validar
   * @returns { success: true, data } ou { success: false, errors }
   */
  static validateCreateUserSafe(data: unknown) {
    const result = CreateUserSchema.safeParse(data)
    
    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors
      }
    }

    return {
      success: true,
      data: result.data
    }
  }

  /**
   * Valida dados de atualização de usuário
   */
  static validateUpdateUser(data: unknown) {
    return UpdateUserSchema.parse(data)
  }

  static validateUpdateUserSafe(data: unknown) {
    const result = UpdateUserSchema.safeParse(data)
    
    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors
      }
    }

    return {
      success: true,
      data: result.data
    }
  }

  /**
   * Valida login do usuário
   */
  static validateLogin(data: unknown) {
    return LoginUserSchema.parse(data)
  }

  static validateLoginSafe(data: unknown) {
    const result = LoginUserSchema.safeParse(data)
    
    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors
      }
    }

    return {
      success: true,
      data: result.data
    }
  }
}
