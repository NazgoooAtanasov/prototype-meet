import { ServerResponse, User } from './types';

export async function putUser(user: User): Promise<User | any> {
    try {
        const putRequest = await fetch('http://192.168.1.10:8000/users/create', { 
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const putRequestResponse: ServerResponse<User> = await putRequest.json();

        if (putRequestResponse.success) {
            return putRequestResponse.data!;
        }

        return putRequestResponse.error;
    } catch (error) {
        return error;
    }
}
