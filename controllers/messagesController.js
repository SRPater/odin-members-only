import { body, validationResult } from 'express-validator';
import * as db from '../db/messagesQueries.js';

export const getIndex = async (req, res, next) => {
  try {
    const messages = await db.getAllMessages();
    res.render('index', {
      title: 'Members Only',
      messages: messages,
    });
  } catch (err) {
    next(err);
  }
};

export const getNewMessage = (req, res) => {
  if (!req.user) return res.redirect('/log-in');

  res.render('new-message-form', { title: 'Post a New Message' });
};

export const postNewMessage = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required.')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters.')
    .escape(),
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Message text is required.')
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters.')
    .escape(),
  
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('new-message-form', {
        title: 'Post a New Message',
        errors: errors.array(),
        previousData: req.body,
      });
    }

    try {
      const { title, text } = req.body;
      const authorId = req.user.id;

      await db.createMessage(title, text, authorId);
      return res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
];
