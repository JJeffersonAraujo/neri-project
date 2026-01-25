import { JwtUtils } from "../utils/jwtUtils.js";
import { prisma } from "../database/prismaClient.js";
export async function expressAuthentication(request, securityName, scopes) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw { status: 401, message: "Token não fornecido" };
    }
    const token = authHeader.replace("Bearer ", "");
    const payload = JwtUtils.verifyAccessToken(token);
    const user = await prisma.usuario.findUnique({
        where: { id: payload.id },
    });
    if (!user) {
        throw { status: 401, message: "Usuário não encontrado" };
    }
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
    };
}
//# sourceMappingURL=expressAuthentication.js.map