const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/addProduct', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      products: products,
      docTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};
