var DBMongoose = require('../db/connection')
const passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt')
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
UserSchema.plugin(passportLocalMongoose)

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.password);
  };
  
// make this available to our users in our Node applications
module.exports = mongoose.model('User', UserSchema)