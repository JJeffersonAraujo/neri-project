import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../shared/utils/jwt.util';
import '../../../shared/types/express.types';
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não informado' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ message: 'Token inválido' });
    }
}
