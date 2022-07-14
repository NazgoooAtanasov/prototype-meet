import { Location, User } from '@prisma/client';

export interface ServerResponse<T> {
    success: boolean;
    error: null | any;
    data?: T
}

export type UserAndLocations = (User & { locations: Location[] }) | null;
