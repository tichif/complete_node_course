const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pagesController = require('./controllers/pages');
const authRoutes = require('./routes/auth');
const MONGO_URI = 'mongodb+srv://tichif:tichif@shop.y8ep5.mongodb.net/shop';

const User = require('./models/user');

const app = express();

// Initialize a store
const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: 'sessions',
});

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
    store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
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
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Database connected');
  })
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log('App is running');
});
