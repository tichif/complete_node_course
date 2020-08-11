const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//######## Apply middleware #############

// Parse the body
app.use(bodyParser.urlencoded({ extended: false }));

// Serve file like css statically
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Page
app.use((req, res, next) => {
  res.status(404).render('pageNotFound', {
    docTitle: 'Page not found',
  });
});

app.listen(5000);
