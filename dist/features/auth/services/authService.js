// src/features/auth/services/authService.ts
import jwt from "jsonwebtoken";
import { prisma } from "../../../config/database.js";
export class AuthService {
    async login({ email, password }) {
        // lógica atual do login
        const user = await prisma.usuario.findUnique({ where: { email } });
        if (!user)
            throw new Error("Usuário não encontrado");
        // validar senha...
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });
        const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
        return { token, refreshToken, user };
    }
    // =======================
    // Renovar token
    // =======================
    async refreshToken(refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const token = jwt.sign({ userId: payload.userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
            return token;
        }
        catch (error) {
            throw new Error("Refresh token inválido");
        }
    }
    // =======================
    // Logout (revogar refresh token)
    // =======================
    async logout(refreshToken) {
        // se você mantém sessões em DB, marque como revogado
        // exemplo fictício:
        await prisma.authSessao.updateMany({
            where: { token: refreshToken },
            data: { deletedAt: new Date() }
        });
    }
}
//# sourceMappingURL=authService.js.map