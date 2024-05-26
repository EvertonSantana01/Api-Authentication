import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function verifyAuth(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (typeof authToken === 'string') {

        const [, token] = authToken.split(' ');

        try {
            const secretKey = '123456789';
            const decoded = verify(token, secretKey) as { sub: string };

            const { sub } = decoded;
            return next();
        } catch (error) {
            return response.status(401).json({ message: 'não autorizado' });
        }
    }
    return response.status(401).json({ message: 'não autorizado' });
}
