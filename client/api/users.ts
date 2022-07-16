import { ServerResponse, Token, User } from './types';

export async function signup(user: User): Promise<(User & Token) | any> {
    try {
        const putRequest = await fetch('http://192.168.1.8:8000/auth/signup', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const putRequestResponse: ServerResponse<User & Token> =
            await putRequest.json();

        if (putRequestResponse.success) {
            return putRequestResponse.data!;
        }

        return putRequestResponse.error;
    } catch (error) {
        return error;
    }
}

export async function signin(credentials: {
    email: string;
    password: string;
}): Promise<Token> {
    try {
        const signinRequest = await fetch(
            'http://192.168.1.8:8000/auth/signin',
            {
                method: 'post',
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const signinRequestResponse: ServerResponse<Token> =
            await signinRequest.json();
        if (signinRequestResponse.success) {
            return signinRequestResponse.data!;
        }

        return signinRequestResponse.error;
    } catch (error) {
        return error;
    }
}
