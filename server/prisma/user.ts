import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function putUser(user: any) {
    await prisma.user.create({
        data: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        }
    });
}

export async function fetchUser(id: number) {
    return await prisma.user.findFirst({
        where: {
            id: id
        },
        include: {
            locations: true
        }
    });
}
