const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://tichif:tichif@shop.y8ep5.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then((result) => {
      console.log('Database Connected');
      _db = result.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
