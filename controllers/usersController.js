import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import pool from '../db/pool.js';

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
      const sql = `
        INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
      `;

      await pool.query(sql, [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password,
      ]);

      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
];
