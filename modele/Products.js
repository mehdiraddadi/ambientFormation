const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const Products = new Schema(
    {
        "id": Number,
        "name": String,
        "description": String,
        "USD_price": Number,
        "file_link": String,
        "creation_date": Date,
        "orders_counter": Number
});

// Inclusion de Mongoose
var mongoose = require('mongoose');
 
// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongoose.connect('mongodb://localhost/27017', function(err) {
  if (err) { throw err; }
});