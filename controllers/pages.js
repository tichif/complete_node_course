exports.getPageNotFound = (req, res, next) => {
  res.status(404).render('pageNotFound', {
    docTitle: 'Page not found',
    path: '',
    isAuthenticated: req.isLoggedIn,
  });
};

exports.getErrorPage = (req, res, next) => {
  res.status(404).render('error', {
    docTitle: 'An Error Occurred',
    path: '',
    isAuthenticated: req.isLoggedIn,
  });
};
