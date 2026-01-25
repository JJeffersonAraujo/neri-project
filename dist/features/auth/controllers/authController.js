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
import { Body, Controller, Post, Route, SuccessResponse, Response, Example } from "tsoa";
import { AuthService } from "../services/authService.js";
let AuthController = class AuthController extends Controller {
    authService = new AuthService();
    async login(body) {
        return this.authService.login({
            email: body.email,
            password: body.senha
        });
    }
};
__decorate([
    SuccessResponse("200", "Login realizado com sucesso"),
    Response("401", "Credenciais inválidas"),
    Post("login"),
    Example({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
            id: 1,
            nome: "Jefferson",
            email: "admin@email.com",
            role: "ADMIN"
        }
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    Route("auth")
], AuthController);
export { AuthController };
//# sourceMappingURL=authController.js.map