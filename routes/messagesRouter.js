import { Router } from 'express';
import * as messagesController from '../controllers/messagesController.js';

const messagesRouter = Router();

messagesRouter.get('/', messagesController.getIndex);

messagesRouter.get('/messages/new', messagesController.getNewMessage);
messagesRouter.post('/messages/new', messagesController.postNewMessage);

messagesRouter.post(
  '/messages/:id/delete',
  messagesController.postDeleteMessage,
);

export default messagesRouter;
