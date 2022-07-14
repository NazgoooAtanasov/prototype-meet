import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { putUser, fetchUser, putLocation } from '../prisma/user';

export async function createUser(req: Request, res: Response) {
    const response: { success: boolean, error: null | any, data?: any } = { success: true, error: null };

    try {
        const user: User = await putUser(req.body);
        response.data = {
            user: { id: user.id }
        };
    } catch (err) {
        response.success = false;
        response.error = err;
    }

    res.json(response);
}

export async function getUser(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const response: { success: boolean, data?: any, error: null | any } = { success: true, error: null };

    try {
        const user = await fetchUser(id);
        response.data = user;
    } catch (err) { 
        response.success = false;
        response.error = err;
    }

    res.json(response);
}

export async function linkLocation(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id);
    const location: any = req.body;
    
    const putLocationResult = await putLocation(userId, location);

    res.json(putLocationResult);
}
