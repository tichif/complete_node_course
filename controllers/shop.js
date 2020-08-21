const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/product-list', {
        products,
        docTitle: 'All products',
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.fetchProductById(prodId)
    .then((product) => {
      res.render('shop/product-details', {
        product: product,
        docTitle: product.title,
        path: `/products/${prodId}`,
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/index', {
        products,
        docTitle: 'Shop',
        path: '/',
      });
    })
    .catch((err) => console.log(err));
};

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts();
//     })
//     .then((products) => {
//       res.render('shop/cart', {
//         path: '/cart',
//         docTitle: 'Your Cart',
//         products,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   let fetchCard;
//   let newQty = 1;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchCard = cart;
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }
//       if (product) {
//         // Increase quantity
//         const oldQuantity = product.cartItem.quantity;
//         newQty = oldQuantity + 1;
//         return product;
//       }
//       // add a new product to the cart
//       return Product.findByPk(prodId);
//     })
//     .then((product) => {
//       return fetchCard.addProduct(product, {
//         through: { quantity: newQty },
//       });
//     })
//     .then(() => {
//       return res.redirect('/cart');
//     })
//     .catch((err) => console.log(err));
// };

// exports.postDeleteCartProductById = (req, res, next) => {
//   const prodId = req.body.prodId;
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       const product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then(() => {
//       res.redirect('/cart');
//     })
//     .catch((err) => console.log(err));
// };

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     docTitle: 'Checkout',
//   });
// };

// exports.getOrdersPage = (req, res, next) => {
//   req.user
//     .getOrders({ include: ['products'] })
//     .then((orders) => {
//       res.render('shop/orders', {
//         path: '/orders',
//         docTitle: 'Orders',
//         orders,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       return req.user
//         .createOrder()
//         .then((order) => {
//           return order.addProducts(
//             products.map((product) => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch((err) => console.log(err));
//     })
//     .then((result) => {
//       return fetchedCart.setProducts(null);
//     })
//     .then((result) => {
//       return res.redirect('/orders');
//     })
//     .catch((err) => console.log(err));
// };
