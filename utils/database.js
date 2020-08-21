const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://tichif:tichif@shop.y8ep5.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then((result) => {
      console.log('Database Connected');
      callback(result);
    })
    .catch((err) => console.log(err));
};
module.exports = mongoConnect;
