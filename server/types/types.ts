import { Location, User } from '@prisma/client';

export interface ServerResponse<T> {
    success: boolean;
    error: null | any;
    data?: T;
}

export type UserAndLocations = (User & { locations: Location[] }) | null;

export interface Token {
    jwt: string;
}

export interface SigninCredentials {
    email: string;
    password: string;
}

export interface TokenCredentials {
    id: number;
    email: string;
}
