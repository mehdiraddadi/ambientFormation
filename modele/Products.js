var DBMongoose = require('../db/connection')
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ProductSchema =  new Schema(
  {
      "id": Number,
      "name": String,
      "description": String,
      "USD_price": Number,
      "file_link": String,
      "creation_date": Date,
      "orders_counter": Number
})

// the schema is useless so far
// we need to create a model using it
var Product = mongoose.model('Product', ProductSchema);

// make this available to our users in our Node applications
module.exports = Product;