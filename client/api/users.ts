import { ServerResponse, Token, User } from './types';

export async function putUser(user: User): Promise<(User & Token) | any> {
    try {
        const putRequest = await fetch('http://192.168.1.10:8000/auth/signup', { 
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const putRequestResponse: ServerResponse<(User & Token)> = await putRequest.json();

        if (putRequestResponse.success) {
            return putRequestResponse.data!;
        }

        return putRequestResponse.error;
    } catch (error) {
        return error;
    }
}
