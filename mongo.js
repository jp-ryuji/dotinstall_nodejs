const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');
const url = "mongodb://" + settings.host;

MongoClient.connect(url, function(err, client) {
  if (err) { return console.dir(err); }
  console.log("connected to db");

  const db = client.db(settings.db);
  insertUsers(db, function() {
    // client.close();
  });
})

const insertUsers = function(db, callback) {
  const collection = db.collection('users');
  collection.insertMany([
    { name: "foo", score: 40 },
    { name: "bar", score: 80 },
    { name: "baz", score: 60 }
  ], function(err, result) {
    // console.dir(result);
    // collection.find({ name: 'foo' }).toArray(function(err, items) {
    //   console.log(items);
    // })

    // stream should be used in case of handling lots of data.
    var stream = collection.find().stream();
    stream.on("data", function(item) {
      console.log(item);
    });
    stream.on("end", function() {
      console.log("finished");
    })
    callback(result);
  });
}
