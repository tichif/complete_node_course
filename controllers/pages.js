exports.getPageNotFound = (req, res, next) => {
  res.status(404).render('pageNotFound', {
    docTitle: 'Page not found',
    path: '',
  });
};
