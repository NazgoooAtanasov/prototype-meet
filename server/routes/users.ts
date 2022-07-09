import { Request, Response } from 'express';
import { putUser, fetchUser } from '../prisma/user';

export async function createUser(req: Request, res: Response) {
    const response: { success: boolean, error: null | any } = { success: true, error: null };

    try {
        await putUser(req.body);
    } catch (err) {
        response.success = false;
        response.error = err;
    }

    res.json(response);
}

export async function getUser(req: Request, res: Response) {
    const id: string = (req.query.id) as string;
    const response: { success: boolean, data?: any, error: null | any } = { success: true, error: null };

    try {
        const user = await fetchUser(parseInt(id));
        response.data = user;
    } catch (err) { 
        response.success = false;
        response.error = err;
    }

    res.json(response);
}
