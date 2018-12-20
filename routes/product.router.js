const mongoose = require('mongoose')
const restify = require('express-restify-mongoose')
var Product = require('../modele/Products')

module.exports = function(router) {

    restify.serve(router, Product)
}