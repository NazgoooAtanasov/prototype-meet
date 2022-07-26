import express from 'express';
import { signin, signup } from './routes/auth';
import { getUser, assignLocation } from './routes/users';
import { auth } from './middlewares/auth';
import dotenv from 'dotenv';

dotenv.config();

const expressApp = express();

expressApp.use(express.json());

expressApp.get('/users/:id', getUser);

expressApp.post('/users/location', auth, assignLocation);

expressApp.post('/auth/signin', signin);
expressApp.post('/auth/signup', signup);

expressApp.listen('8000', () => {
    console.debug('[server] running at port 8000');
});
