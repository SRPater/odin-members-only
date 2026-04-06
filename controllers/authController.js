import passport from 'passport';

export const getLogin = (req, res) => {
  res.render('log-in-form', { title: 'Log In' });
};

export const postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in',
  failureFlash: true,
});

export const getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
};
