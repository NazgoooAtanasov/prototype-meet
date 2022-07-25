import { Location } from '@prisma/client';
import { Request, Response } from 'express';
import { putLocation } from '../prisma/user';
import { ServerResponse, UserAndLocations } from '../types/types';

import jwt, { JwtPayload } from 'jsonwebtoken';

function checkJWT(req: Request, res: Response) {
    const authHeader: string | undefined = req.header('Authorization');
    console.log(authHeader);

    if (!authHeader) return null;

    const [_bearer, token]: string[] = authHeader.split(' ')!;
    console.log(token);

    const decodedToken: JwtPayload | string = jwt.verify(
        token,
        process.env.JWT_SECRET!
    );
}

export async function assignLocation(req: Request, res: Response) {
    const response: ServerResponse<UserAndLocations> = {
        success: true,
        error: null,
    };

    const userId: number = parseInt(res.locals.authenticatedUserId);
    const location: Location = req.body;

    try {
        const putLocationResult: UserAndLocations = await putLocation(
            userId,
            location
        );
        response.data = putLocationResult;
    } catch (error) {
        response.error = error;
        response.success = false;
    }

    res.json(response);
}
