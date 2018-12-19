var DBMongoose = require('../db/connection')
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var OrderSchema =  new Schema(
  {
      "productId": {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
      "userId" : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      "orderDate": { type: Date, default: Date.now },
      "price": Number

      
})

// the schema is useless so far
// we need to create a model using it
var Order = mongoose.model('Order', OrderSchema);

// make this available to our users in our Node applications
module.exports = Order;