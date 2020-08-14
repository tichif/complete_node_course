const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      products: products,
      docTitle: 'All products',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findProductById(prodId, (product) => {
    res.render('shop/product-details', {
      product,
      docTitle: product.title,
      path: `/products/${prodId}`,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      products: products,
      docTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    docTitle: 'Your Cart',
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findProductById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    docTitle: 'Checkout',
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    docTitle: 'Orders',
  });
};
