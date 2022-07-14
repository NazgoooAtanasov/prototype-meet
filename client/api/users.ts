import { User } from './types';

export async function putUser(user: User): Promise<number | any> {
    try {
        const putRequest = await fetch('http://192.168.1.10:8000/users/create', { 
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const putRequestResponse: { success: boolean, error: null | any, data?: { user: { id: number } } } = await putRequest.json();

        if (putRequestResponse.success) {
            return putRequestResponse.data!.user.id;
        }

        return putRequestResponse.error;
    } catch (error) {
        console.log(error);
    }
}
