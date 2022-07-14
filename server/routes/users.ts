import { Location, User } from '@prisma/client';
import { Request, Response } from 'express';
import { fetchUser, putLocation } from '../prisma/user';
import { ServerResponse, UserAndLocations } from '../types/types';

export async function getUser(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const response: ServerResponse<UserAndLocations> = { success: true, error: null };

    try {
        const user: UserAndLocations = await fetchUser(id);
        response.data = user;
    } catch (err) { 
        response.success = false;
        response.error = err;
    }

    res.json(response);
}

export async function linkLocation(req: Request, res: Response) {
    const response: ServerResponse<UserAndLocations> = { success: true, error: null };

    const userId: number = parseInt(req.params.id);
    const location: Location = req.body;
    
    try {
        const putLocationResult: UserAndLocations = await putLocation(userId, location);
        response.data = putLocationResult;
    } catch (error) {
        response.error = error;
        response.success = false;
    }

    res.json(response);
}
