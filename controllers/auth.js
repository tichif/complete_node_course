exports.getLoginPage = (req, res, next) => {
  const isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1];
  console.log(isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    docTitle: 'Login',
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'isLogged=true');
  res.redirect('/');
};
