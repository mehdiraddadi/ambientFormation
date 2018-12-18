var DBMongoose = require('../db/connection')
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
const UserSchema = new Schema(
    {
        "username": String,
        "password": String
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', UserSchema);

// make this available to our users in our Node applications
module.exports = User;