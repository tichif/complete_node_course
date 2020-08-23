const path = require('path');

const express = require('express');

// Product Controller
const adminController = require('../controllers/admin');

// Create routes
const router = express.Router();

// router.get('/add-product', adminController.getAddProduct);

// router.post('/add-product', adminController.postAddProduct);

// router.get('/products', adminController.getProducts);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
