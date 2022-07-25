import express from 'express';
import { signin, signup } from './routes/auth';
import { assignLocation } from './routes/users';
import { auth } from './middlewares/auth';
import dotenv from 'dotenv';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { z } from 'zod';
import { prisma } from './prisma/user';
import { UserAndLocations, TokenCredentials, Token } from './types/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

dotenv.config();

const expressApp = express();

expressApp.use(
    cors({
        origin: 'http://localhost:19006',
    })
);

const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    return {
        req,
        res,
        prisma,
    };
};
type Context = trpc.inferAsyncReturnType<typeof createContext>;

function generateJWT(tokenCredentials: TokenCredentials) {
    const token = jwt.sign(
        { data: tokenCredentials },
        process.env.JWT_SECRET!,
        { expiresIn: '1y' }
    );

    return token;
}

const usersRouter = trpc.router<Context>().query('get', {
    input: z.number(),
    async resolve({ ctx: { prisma }, input }): Promise<UserAndLocations> {
        return await prisma.user.findFirst({
            where: { id: input },
            include: { locations: true },
        });
    },
});

const authRouter = trpc
    .router<Context>()
    .mutation('signin', {
        input: z.object({
            email: z.string(),
            password: z.string(),
        }),
        async resolve({
            ctx: { prisma },
            input: { email, password },
        }): Promise<{
            message: string;
            jwt: string | null;
        }> {
            const user: UserAndLocations = await prisma.user.findFirst({
                where: { email },
                include: { locations: true },
            });

            if (!user) return { message: 'User does not exist', jwt: null };

            const arePasswordsMatching = await bcrypt.compare(
                password,
                user.password
            );

            if (!arePasswordsMatching)
                return { message: 'Wrong password', jwt: null };

            return {
                message: 'Success',
                jwt: generateJWT({ email, id: user.id }),
            };
        },
    })
    .mutation('signup', {
        input: z.object({
            firstname: z.string(),
            lastname: z.string(),
            email: z.string(),
            password: z.string(),
        }),
        async resolve({
            ctx: { prisma },
            input: { firstname, lastname, email, password },
        }): Promise<User & Token> {
            const rounds = 10;
            const hashedPassword = await bcrypt.hash(password, rounds);

            const user: User = await prisma.user.create({
                data: { firstname, lastname, email, password: hashedPassword },
            });

            user.password = '***';

            const token: Token = { jwt: generateJWT({ email, id: user.id }) };

            return { ...token, ...user };
        },
    });

const appRouter = trpc
    .router<Context>()
    .merge('users.', usersRouter)
    .merge('auth.', authRouter);

expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

expressApp.use(express.json());

expressApp.post('/users/location', auth, assignLocation);

expressApp.listen('8000', () => {
    console.debug('[server] running at port 8000');
});

export type AppRouter = typeof appRouter;
