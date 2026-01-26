import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags
} from 'tsoa'

import { UserService } from '../services/userServices'
import type { CreateUserDTO } from '../dtos/createUserDTO.js'
import type { UpdateUserDTO } from '../dtos/updateUserDTO.js'

@Route('users')
@Tags('Usuário')
export class UserController extends Controller {
  private readonly userService = new UserService()

  // ==========================
  // Criar usuário (SEM JWT)
  // ==========================
  @Post()
  @SuccessResponse('201', 'Usuário criado com sucesso')
  @Response('400', 'Dados inválidos')
  public async create(
    @Body() body: CreateUserDTO
  ): Promise<unknown> {
    const result = await this.userService.create(body)
    this.setStatus(201)
    return result
  }

  // ==========================
  // Listar usuários (COM JWT)
  // ==========================
  @Security('bearerAuth')
  @Get()
  @SuccessResponse('200', 'Lista de usuários')
  public async findAll(): Promise<unknown[]> {
    return this.userService.findAll()
  }

  // ==========================
  // Buscar por ID (COM JWT)
  // ==========================
  @Security('bearerAuth')
  @Get('{id}')
  @Response('404', 'Usuário não encontrado')
  public async findById(
    @Path() id: number
  ): Promise<unknown> {
    const user = await this.userService.findById(id)

    if (!user) {
      this.setStatus(404)
      return { message: 'Usuário não encontrado' }
    }

    return user
  }

  // ==========================
  // Atualizar usuário (COM JWT)
  // ==========================
  @Security('bearerAuth')
  @Put('{id}')
  @SuccessResponse('200', 'Usuário atualizado')
  @Response('404', 'Usuário não encontrado')
  public async update(
    @Path() id: number,
    @Body() body: UpdateUserDTO
  ): Promise<unknown> {
    return this.userService.update(id, body)
  }

  // ==========================
  // Remover usuário (COM JWT)
  // ==========================
  @Security('bearerAuth')
  @Delete('{id}')
  @SuccessResponse('204', 'Usuário removido')
  @Response('404', 'Usuário não encontrado')
  public async delete(
    @Path() id: number
  ): Promise<void> {
    await this.userService.delete(id)
    this.setStatus(204)
  }
}
