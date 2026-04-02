import { Router } from 'express';
import * as usersController from '../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get('/sign-up', usersController.getSignUp);
usersRouter.post('/sign-up', usersController.postSignUp);

export default usersRouter;
