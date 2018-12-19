var DBMongoose = require('../db/connection')
const passportLocalMongoose = require('passport-local-mongoose');
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
const User = new Schema(
    {
        "username": String,
        "password": String
});

// the schema is useless so far
// we need to create a model using it
User.plugin(passportLocalMongoose)

// make this available to our users in our Node applications
module.exports = mongoose.model('User', User)