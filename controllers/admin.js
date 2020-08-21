const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, price, imageUrl, description, null);
  product
    .save()
    .then((response) => {
      return res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.fetchProductById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        docTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: true,
        product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updateTitle = req.body.title;
  const updateImageUrl = req.body.imageUrl;
  const updatePrice = req.body.price;
  const updateDescription = req.body.description;

  const product = new Product(
    updateTitle,
    updatePrice,
    updateImageUrl,
    updateDescription,
    productId
  );
  product
    .save()
    .then(() => {
      return res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('admin/products', {
        products,
        docTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productID = req.body.prodID;
  Product.deleteById(productID)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};
