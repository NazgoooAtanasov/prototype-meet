import bcrypt from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
import { UserAndLocations } from '../types/types';

const prisma = new PrismaClient();

export async function putUser(user: User): Promise<User> {
    // what are rounds???
    const rounds = 10;
    const hashedpassword = await bcrypt.hash(user.password, rounds);

    return await prisma.user.create({
        data: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: hashedpassword,
        },
    });
}

export async function fetchUser(id: number): Promise<UserAndLocations> {
    return await prisma.user.findFirst({
        where: { id },
        include: {
            locations: true,
        },
    });
}

export async function fetchUserByEmail(
    email: string
): Promise<UserAndLocations> {
    return await prisma.user.findFirst({
        where: { email },
        include: {
            locations: true,
        },
    });
}

export async function putLocation(
    id: number,
    location: any
): Promise<UserAndLocations> {
    return await prisma.user.update({
        where: { id },
        data: {
            locations: {
                create: location,
            },
        },
        include: {
            locations: true,
        },
    });
}
