import { request } from '../utils/request';
import { ServerResponse, Token, User } from './types';

export async function signup(user: User): Promise<(User & Token) | any> {
    try {
        const signup: ServerResponse<User & Token> = await request(
            '/auth/signup',
            {
                method: 'post',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (signup.success) {
            return signup.data!;
        }

        return signup.error;
    } catch (error) {
        return error;
    }
}

export async function signin(credentials: {
    email: string;
    password: string;
}): Promise<Token> {
    try {
        const signin: ServerResponse<Token> = await request('/auth/signin', {
            method: 'post',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (signin.success) {
            return signin.data!;
        }

        return signin.error;
    } catch (error) {
        return error;
    }
}
