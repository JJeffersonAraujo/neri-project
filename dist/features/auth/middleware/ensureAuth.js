import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../config/jwt';
export function ensureAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = { id: decoded.userId };
        return next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
//# sourceMappingURL=ensureAuth.js.map