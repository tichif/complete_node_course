const express = require('express');

// Create routes
const router = express.Router();

router.get('/add-product', (req, res, next) => {
  console.log('The Add Product page');
  res.send(
    '<!DOCTYPE html><html><head><title>The add page</title></head><body><form action="/product" method="POST"><input type="text" name="message"><input type="submit" value="Submit"></form></body></html>'
  );
});

router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
