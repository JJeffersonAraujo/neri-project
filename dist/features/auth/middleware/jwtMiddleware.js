import jwt from "jsonwebtoken";
import { jwtConfig } from "../../../config/jwt.js";
export async function expressAuthentication(request, securityName) {
    if (securityName !== "jwt") {
        throw new Error("Security inválida");
    }
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error("Token não informado");
    }
    const [, token] = authHeader.split(" ");
    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        return decoded;
    }
    catch {
        throw new Error("Token inválido");
    }
}
//# sourceMappingURL=jwtMiddleware.js.map