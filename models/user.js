const mongoDB = require('mongodb');

const { getDB } = require('../utils/database');

const ObjectId = mongoDB.ObjectId;

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDB();
    return db
      .collection('users')
      .insertOne(this)
      .then((result) => console.log(result))
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
