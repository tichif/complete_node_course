const User = require('../models/user');

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    docTitle: 'Login',
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5f42f9889c36d2736420f83a')
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        res.redirect('/');
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
