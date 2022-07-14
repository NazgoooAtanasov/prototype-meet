import jwt from 'jsonwebtoken';

import { fetchUserByEmail, putUser } from '../prisma/user';
import { Request, Response } from 'express';
import {
    ServerResponse,
    UserAndLocations,
    TokenCredentials,
    Token,
    SigninCredentials
} from '../types/types';
import { User } from '@prisma/client';

function generateJWT(tokenCredentials: TokenCredentials) {
    const token = jwt.sign(
        { data: tokenCredentials },
        process.env.JWT_SECRET!,
        { expiresIn: '1y' }
    );

    return token;
}

export async function signin(req: Request, res: Response) {
    const response: ServerResponse<Token> = { success: true, error: null };
    const signinCredentials: SigninCredentials = req.body;

    const user: UserAndLocations = await fetchUserByEmail(signinCredentials.email);

    if (!user) {
        response.success = false;
        response.error = 'User does not exist';

        return res.json(response);
    }

    // check password hash

    response.data = {
        jwt: generateJWT({ email: user.email, id: user.id })
    };
    
    res.json(response);
}

export async function signup(req: Request, res: Response) {
    const response: ServerResponse<User> = { success: true, error: null };

    try {
        const user: User = await putUser(req.body);
        response.data = user;
    } catch (err) {
        response.success = false;
        response.error = err;
    }

    res.json(response);
}
