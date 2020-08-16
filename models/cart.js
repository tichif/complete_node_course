const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    let cart = { products: [], totalPrice: 0 };
    // Fetch previous cart
    fs.readFile(p, (err, data) => {
      if (!err) {
        cart = JSON.parse(data);
      }
      // Analyze the cart => Verify if the product already exists
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product / increase the quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice; // convert productPrice as a integer
      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static deleteProductById(id, productPrice) {
    fs.readFile(p, (err, data) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(data) };
      const product = updatedCart.products.find((p) => p.id === id);
      const productQty = product.qty;
      // delete the product
      updatedCart.products = updatedCart.products.filter((p) => p.id !== id);
      updatedCart.totalPrice =
        updatedCart.totalPrice - productQty * productPrice;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => console.log(err));
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, data) => {
      const cart = JSON.parse(data);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
