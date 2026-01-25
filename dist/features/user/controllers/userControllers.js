var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Path, Post, Put, Response, Route, Security, SuccessResponse, } from "tsoa";
import { UserService } from "../services/userServices.js";
let UserController = class UserController extends Controller {
    userService = new UserService();
    // ==========================
    // Criar usuário
    // ==========================
    async create(body) {
        return this.userService.create(body);
    }
    // ==========================
    // Listar usuários
    // ==========================
    async findAll() {
        return this.userService.findAll();
    }
    // ==========================
    // Buscar por ID
    // ==========================
    async findById(id) {
        return this.userService.findById(id);
    }
    // ==========================
    // Atualizar
    // ==========================
    async update(id, body) {
        return this.userService.update(id, body);
    }
    // ==========================
    // Remover
    // ==========================
    async delete(id) {
        await this.userService.delete(id);
    }
};
__decorate([
    SuccessResponse("201", "Usuário criado com sucesso"),
    Response("400", "Dados inválidos"),
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    Response("404", "Usuário não encontrado"),
    Get("{id}"),
    __param(0, Path()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    Put("{id}"),
    __param(0, Path()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    SuccessResponse("204", "Usuário removido"),
    Delete("{id}"),
    __param(0, Path()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    Route("users"),
    Security("bearerAuth")
], UserController);
export { UserController };
//# sourceMappingURL=userControllers.js.map