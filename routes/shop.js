const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post(
  '/cart-delete-item',
  isAuth,
  shopController.postDeleteCartProductById
);

// // router.get('/checkout', shopController.getCheckout);

router.get('/orders', isAuth, shopController.getOrdersPage);

router.post('/create-order', isAuth, shopController.postOrder);

module.exports = router;
