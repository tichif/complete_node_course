const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, filedData]) => {
      res.render('shop/product-list', {
        products: rows,
        docTitle: 'All products',
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findProductById(prodId)
    .then(([product]) => {
      res.render('shop/product-details', {
        product: product[0],
        docTitle: product[0].title,
        path: `/products/${prodId}`,
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, filedData]) => {
      res.render('shop/index', {
        products: rows,
        docTitle: 'Shop',
        path: '/',
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find((p) => p.id === product.id);
        if (cart.products.find((p) => p.id === product.id)) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty,
          });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        docTitle: 'Your Cart',
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findProductById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postDeleteCartProductById = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.findProductById(prodId, (prod) => {
    Cart.deleteProductById(prodId, prod.price);
    res.redirect('/cart');
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
