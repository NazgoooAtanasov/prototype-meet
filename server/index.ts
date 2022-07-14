import express from 'express';
import { signin, signup } from './routes/auth';
import { getUser, linkLocation } from './routes/users';
import dotenv from 'dotenv';

dotenv.config();

const expressApp = express();

expressApp.use(express.json());

expressApp.get('/users/:id', getUser);

expressApp.post('/users/:id/location', linkLocation);

expressApp.post('/auth/signin', signin);
expressApp.post('/auth/signup', signup);

expressApp.listen('8000', () => {
    console.debug('[server] running at port 8000');
});
