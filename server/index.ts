import express from 'express';
import { signin, signup } from './routes/auth';
import { getUser, assignLocation } from './routes/users';
import { auth } from './middlewares/auth';
import dotenv from 'dotenv';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';

dotenv.config();

const expressApp = express();

expressApp.use(
    cors({
        origin: 'http://localhost:19006',
    })
);

const appRouter = trpc.router();

const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = trpc.inferAsyncReturnType<typeof createContext>;

expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

expressApp.use(express.json());

expressApp.get('/users/:id', getUser);

expressApp.post('/users/location', auth, assignLocation);

expressApp.post('/auth/signin', signin);
expressApp.post('/auth/signup', signup);

expressApp.listen('8000', () => {
    console.debug('[server] running at port 8000');
});

export type AppRouter = typeof appRouter;
