var express = require('express')
var app = express();
var ejs = require('ejs')
var bodyParser = require('body-parser')
var products = require('./products/products')
var fetch = require("node-fetch")

app.set('view engine', 'ejs')
app.use('/assets', express.static('public'))

app.get('/', function(req, res) {
    products.readFileProducts(function(products) {
        res.render('index', {products: products})
    })
 });

 app.get('/product/:id', function(req, res) {
 	fetch('http://localhost:3030/mock/products.json').then(function(data){
 		console.log(data)
 	})
    console.log(req.params.id)
 })

app.listen(3030, function () {
    console.log('Example app listening on port 3000!')
})