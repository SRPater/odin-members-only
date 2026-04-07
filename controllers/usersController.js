import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import * as db from '../db/usersQueries.js';

export const getSignUp = (req, res) => {
  res.render('sign-up-form', { title: 'Sign Up' });
};

export const postSignUp = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required.')
    .escape(),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required.')
    .escape(),
  body('email')
    .isEmail()
    .withMessage('Provide a valid email address.')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match.');
    }

    return true;
  }),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('sign-up-form', {
        title: 'Sign Up',
        errors: errors.array(),
        previousData: req.body,
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
      const user = await db.createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        hashedPassword,
      );

      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect('/');
      });
    } catch (err) {
      return next(err);
    }
  },
];

export const getMembership = (req, res) => {
  if (!req.user) return res.redirect('/log-in');

  res.render('passcode-form', {
    title: 'Unlock Member Status',
    target: 'Member',
    action: '/membership',
  });
};

export const postMembership = async (req, res, next) => {
  const { passcode } = req.body;
  const secretCode = process.env.PASSPHRASE_MEMBER;

  if (passcode !== secretCode) {
    return res.render('passcode-form', {
      title: 'Unlock Member Status',
      target: 'Member',
      action: '/membership',
      errors: ['Incorrect passcode. Try again!'],
    });
  }
  
  try {
    await db.updateUserMembership(req.user.id);
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};
