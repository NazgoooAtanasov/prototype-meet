export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface ServerResponse<T> {
    success: true;
    error: null | any;
    data?: T;
}

export interface Token {
    jwt: string;
}
