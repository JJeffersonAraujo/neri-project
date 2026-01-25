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
} from "tsoa";

import { UserService } from "../services/userServices.js";
import type { CreateUserDTO } from "../dtos/createUserDTO.js";
import type { UpdateUserDTO } from "../dtos/updateUserDTO.js";

@Route("users")
@Tags("Usuário")
@Security("bearerAuth")
export class UserController extends Controller {
  private readonly userService = new UserService();

  // ==========================
  // Criar usuário
  // ==========================
  @SuccessResponse("201", "Usuário criado com sucesso")
  @Response("400", "Dados inválidos")
  @Post()
  public async create(
    @Body() body: CreateUserDTO
  ): Promise<unknown> {
    return this.userService.create(body);
  }

  // ==========================
  // Listar usuários
  // ==========================
  @Get()
  public async findAll(): Promise<unknown[]> {
    return this.userService.findAll();
  }

  // ==========================
  // Buscar por ID
  // ==========================
  @Response("404", "Usuário não encontrado")
  @Get("{id}")
  public async findById(
    @Path() id: number
  ): Promise<unknown> {
    return this.userService.findById(id);
  }

  // ==========================
  // Atualizar
  // ==========================
  @Put("{id}")
  public async update(
    @Path() id: number,
    @Body() body: UpdateUserDTO
  ): Promise<unknown> {
    return this.userService.update(id, body);
  }

  // ==========================
  // Remover
  // ==========================
  @SuccessResponse("204", "Usuário removido")
  @Delete("{id}")
  public async delete(
    @Path() id: number
  ): Promise<void> {
    await this.userService.delete(id);
  }
}
