const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pagesController = require('./controllers/pages');

const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');

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
app.use(pagesController.getPageNotFound);

// Create Relations between models
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
User.hasMany(Product);

// Sync all models
sequelize
  .sync({ force: true })
  .then((res) => {
    console.log('Database connected');
    app.listen(5000);
  })
  .catch((err) => console.log(err));
