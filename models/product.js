const mongoDB = require('mongodb');
const { getDB } = require('../utils/database');

class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = new mongoDB.ObjectId(id);
  }

  save() {
    const db = getDB();
    let dbOp;
    if (this._id) {
      // update product
      dbOp = db
        .collection('products')
        .updateOne({ _id: new mongoDB.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp.collection('products').insertOne(this);
    }
    return dbOp
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDB();
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static fetchProductById(id) {
    const db = getDB();
    return db
      .collection('products')
      .find({ _id: new mongoDB.ObjectId(id) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(id) {
    const db = getDB();
    return db
      .collection('products')
      .deleteOne({ _id: new mongoDB.ObjectId(id) })
      .then((result) => {
        console.log('Product deleted');
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
