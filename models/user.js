const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

UserSchema.methods.addToCart = function (product) {
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
      productId: product._id,
      quantity: newQty,
    });
  }
  const updatedCart = {
    items: updateCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

UserSchema.methods.deleteItemFromCart = function (id) {
  const updatedCartItems = this.cart.items.filter(
    (item) => item.productId.toString() !== id.toString()
  );
  this.cart.items = updatedCartItems;
  return this.save();
};

UserSchema.methods.clearCart = function () {
  this.cart.items = [];
  return this.save();
};
module.exports = mongoose.model('User', UserSchema);
