import { server } from './constants';

export async function request<T>(url: string, options: object): Promise<T> {
    const requested = await fetch(`${server}${url}`, options);
    return await requested.json();
}
