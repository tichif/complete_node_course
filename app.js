const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//######## Apply middleware #############

// Parse the body
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
  console.log('The Add Product page');
  res.send(
    '<!DOCTYPE html><html><head><title>The add page</title></head><body><form action="/product" method="POST"><input type="text" name="message"><input type="submit" value="Submit"></form></body></html>'
  );
});

app.use('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  console.log('The Homepage');
  res.send('<h1>The home page</h1>');
});

app.listen(5000);
