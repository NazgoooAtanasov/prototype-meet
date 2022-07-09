import express from 'express';
import { createUser, getUser } from './routes/users';

const expressApp = express();

expressApp.use(express.json());

expressApp.post('/users/create', createUser);
expressApp.get('/users/get', getUser);

expressApp.listen('8000', () => {
    console.debug('[server] running at port 8000');
});
