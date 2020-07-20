const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

//######## Apply middleware #############

// Parse the body
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'pageNotFound.htm'));
});

app.listen(5000);
