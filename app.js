const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

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

const csrfProtection = csurf();

app.set('view engine', 'ejs');
app.set('views', 'views');

//######## Apply middleware #############

const fileStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + new Date().toISOString());
  },
});

// Parse the body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({
    storage: fileStorage,
  }).single('image')
);
app.use(
  session({
    secret: 'scncihdyy32xnxka',
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

// CSRF Protection middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Serve file like css statically
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// 500 page
app.get('/error', pagesController.getErrorPage);
// 404 Page
app.use(pagesController.getPageNotFound);

// Error Middleware
app.use((err, req, res, next) => {
  res.redirect('/error');
});

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
