const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pagesController = require('./controllers/pages');

// Mysql database connection
const db = require('./utils/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//######## Apply middleware #############

// Parse the body
app.use(bodyParser.urlencoded({ extended: false }));

// Serve file like css statically
app.use(express.static(path.join(__dirname, 'public')));

db.execute('SELECT * FROM products')
  .then((res) => {
    console.log(res[0]);
  })
  .catch((err) => console.log(err));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Page
app.use(pagesController.getPageNotFound);

app.listen(5000);
