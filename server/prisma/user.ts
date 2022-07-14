import { PrismaClient, User } from '@prisma/client';
import { UserAndLocations } from '../types/types';

const prisma = new PrismaClient();

export async function putUser(user: User): Promise<User> {
    return await prisma.user.create({
        data: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        },
    });
}

export async function fetchUser(id: number): Promise<UserAndLocations> {
    return await prisma.user.findFirst({
        where: {
            id: id
        },
        include: {
            locations: true
        }
    });
}

export async function putLocation(id: number, location: any): Promise<UserAndLocations> {
    return await prisma.user.update({
        where: { id },
        data: {
            locations: {
                create: location
            }
        },
        include: {
            locations: true
        }
    });
}
