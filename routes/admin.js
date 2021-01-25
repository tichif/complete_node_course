const path = require('path');

const express = require('express');

// Product Controller
const adminController = require('../controllers/admin');

// Middleware
const isAuth = require('../middleware/isAuth');

// Create routes
const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProduct);

router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
