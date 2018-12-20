const mongoose = require('mongoose')
const restify = require('express-restify-mongoose')
var User = require('../modele/Users')

module.exports = function(router) {

    restify.serve(router, User)
}