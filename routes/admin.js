const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

// Create routes
const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'addProduct.htm'));
  res.sendFile(path.join(rootDir, 'views', 'addProduct.htm'));
});

router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
