import { Router } from 'express';
import * as usersController from '../controllers/usersController.js';
import * as authController from '../controllers/authController.js';

const usersRouter = Router();

usersRouter.get('/sign-up', usersController.getSignUp);
usersRouter.post('/sign-up', usersController.postSignUp);

usersRouter.get('/log-in', authController.getLogin);
usersRouter.post('/log-in', authController.postLogin);
usersRouter.get('/log-out', authController.getLogout);

export default usersRouter;
