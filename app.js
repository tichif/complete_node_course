const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pagesController = require('./controllers/pages');
const authRoutes = require('./routes/auth');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//######## Apply middleware #############

// Parse the body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'scncihdyy32xnxka',
    resave: false,
    saveUninitialized: false,
  })
);

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
app.use(authRoutes);

// 404 Page
app.use(pagesController.getPageNotFound);

mongoose
  .connect(
    'mongodb+srv://tichif:tichif@shop.y8ep5.mongodb.net/shop?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log('Database connected');
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
    app.listen(5000, () => {
      console.log('App is running');
    });
  })
  .catch((err) => console.log(err));
