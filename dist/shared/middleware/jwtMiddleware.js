import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.js";
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token não informado" });
    }
    const [, token] = authHeader.split(" ");
    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ message: "Token inválido" });
    }
}
// 🔑 USADO PELO TSOA
export async function expressAuthentication(request, _securityName, _scopes) {
    if (!request.user) {
        throw new Error("Não autenticado");
    }
    return request.user;
}
//# sourceMappingURL=jwtMiddleware.js.map