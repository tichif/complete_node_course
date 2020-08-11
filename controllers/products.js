const products = [];

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'addProduct.htm'));
  res.render('addProduct', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  res.render('shop', {
    products: products,
    docTitle: 'Shop',
    path: '/',
  });
};
