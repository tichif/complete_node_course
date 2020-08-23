const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pagesController = require('./controllers/pages');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//######## Apply middleware #############

// Parse the body
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById('5f42f9889c36d2736420f83a')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// Serve file like css statically
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Page
app.use(pagesController.getPageNotFound);

mongoose
  .connect(
    'mongodb+srv://tichif:tichif@shop.y8ep5.mongodb.net/shop?retryWrites=true&w=majority'
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Tichif',
          email: 'charlby5@gmail.com',
          cart: {
            items: [],
          },
        });
        return user.save();
      }
    });
  })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
