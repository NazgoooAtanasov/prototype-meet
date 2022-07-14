export interface User {
    firstname: string,
    lastname: string,
    email: string
};

export interface ServerResponse<T> {
    success: true,
    error: null | any,
    data?: T
}
