import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import session from 'express-session';
import flash from 'connect-flash';
import passport from './config/passport.js';
import usersRouter from './routes/usersRouter.js';
import messagesRouter from './routes/messagesRouter.js';

const app = express();

app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  
  const flashErrors = req.flash('error');
  res.locals.errors = flashErrors.length > 0 ? flashErrors : null;
  
  next();
});

app.use('/', messagesRouter);
app.use('/', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
