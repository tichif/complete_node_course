const mongoDB = require('mongodb');

const { getDB } = require('../utils/database');

const ObjectId = mongoDB.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDB();
    return db
      .collection('users')
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => cp.productId.toString() === product._id.toString()
    );
    let newQty = 1;
    const updateCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      // if the product exist overwrite the quantity
      newQty = this.cart.items[cartProductIndex].quantity + 1;
      updateCartItems[cartProductIndex].quantity = newQty;
    } else {
      // if the product doesn't exist, push a new object in the array
      updateCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQty,
      });
    }
    const updatedCart = {
      items: updateCartItems,
    };
    const db = getDB();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDB();
    const productsIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection('products')
      .find({ _id: { $in: productsIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find(
              (i) => i.productId.toString() === p._id.toString()
            ).quantity,
          };
        });
      })
      .catch((err) => console.log(err));
  }

  static findUserById(id) {
    const db = getDB();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(id) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
