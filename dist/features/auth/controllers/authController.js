import { AuthService } from '../services/authService.js';
export class AuthController {
    authService = new AuthService();
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const result = await this.authService.login({
                email,
                password: senha,
            });
            return res.json(result);
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
}
