const path = require('path');

const express = require('express');

// Product Controller
const productsController = require('../controllers/products');

// Create routes
const router = express.Router();

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

module.exports = router;
