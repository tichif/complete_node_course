const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pagesController = require('./controllers/pages');

const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//######## Apply middleware #############

// Parse the body
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findByPk(1)
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

// Create Relations between models
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// Sync all models
sequelize
  .sync({ force: true })
  // .sync()
  .then((res) => {
    console.log('Database connected');
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: 'Tichif',
        email: 'tichif@gmail.com',
      });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    // console.log(user);
    app.listen(5000);
  })
  .catch((err) => console.log(err));
