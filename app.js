const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.engine(
  'handlebars',
  expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main' })
);
app.set('view engine', 'handlebars');
app.set('views', 'views');

//######## Apply middleware #############

// Parse the body
app.use(bodyParser.urlencoded({ extended: false }));

// Serve file like css statically
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

// 404 Page
app.use((req, res, next) => {
  res.status(404).render('pageNotFound', {
    docTitle: 'Page not found',
  });
});

app.listen(5000);
