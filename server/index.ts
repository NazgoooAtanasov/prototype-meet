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

const usersRouter = trpc.router<Context>().query('get', {
    input: z.number(),
    async resolve({ ctx: { prisma }, input }) {
        return await prisma.user.findFirst({
            where: { id: input },
            include: { locations: true },
        });
    },
});

const appRouter = trpc.router<Context>().merge('users.', usersRouter);

expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

expressApp.use(express.json());

expressApp.post('/users/location', auth, assignLocation);

expressApp.post('/auth/signin', signin);
expressApp.post('/auth/signup', signup);

expressApp.listen('8000', () => {
    console.debug('[server] running at port 8000');
});

export type AppRouter = typeof appRouter;
