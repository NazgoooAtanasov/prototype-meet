import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { NextFunction } from 'express';

export function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader: string | undefined = req.header('Authorization');

    if (!authHeader) return res.status(401).json({});

    const [_bearer, token]: string[] = authHeader.split(' ')!;

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    res.locals.authenticatedUserId = decodedToken.data.id;
    next();
}
