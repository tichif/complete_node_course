const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

// Create routes
const router = express.Router();

router.get('/add-product', (req, res, next) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'addProduct.htm'));
  res.sendFile(path.join(rootDir, 'views', 'addProduct.htm'));
});

router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
