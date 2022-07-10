import express from 'express';
import { createUser, getUser, linkLocation } from './routes/users';

const expressApp = express();

expressApp.use(express.json());

expressApp.post('/users/create', createUser);
expressApp.get('/users/:id', getUser);

expressApp.post('/users/:id/location', linkLocation)

expressApp.listen('8000', () => {
    console.debug('[server] running at port 8000');
});
