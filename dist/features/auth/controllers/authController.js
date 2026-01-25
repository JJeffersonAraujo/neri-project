import { AuthService } from '../services/authService.js';
import { loginSchema } from '../dtos/loginDTO.js';
export class AuthController {
    authService = new AuthService();
    async login(req, res) {
        const parsed = loginSchema.safeParse({
            email: req.body.email,
            password: req.body.senha, // aceita "senha" do Swagger
        });
        if (!parsed.success) {
            return res.status(400).json({
                message: 'Dados inválidos',
                errors: parsed.error.format(),
            });
        }
        try {
            const result = await this.authService.login(parsed.data);
            return res.json(result);
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
}
