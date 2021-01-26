const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    docTitle: 'Login',
    isAuthenticated: false,
    csrfToken: req.csrfToken(),
  });
};

exports.getSignUpPage = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    docTitle: 'Signup',
    isAuthenticated: false,
    csrfToken: req.csrfToken(),
  });
};

exports.postSignUp = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => res.redirect('/login'));
    })
    .catch((err) => console.log(err));
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect('/');
            });
          }
          res.redirect('/login');
        })
        .catch((err) => {
          console.log(err);
          return res.redirect('/login');
        });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
