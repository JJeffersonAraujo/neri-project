import jwt from 'jsonwebtoken';
import { jwtConfig } from '../utils/jwt.util.js';
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não informado' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.userId = decoded.id;
        return next();
    }
    catch {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
}
