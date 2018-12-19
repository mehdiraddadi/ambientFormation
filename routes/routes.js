var express = require('express')
var passport = require('passport')
var Product = require('../modele/Products')
var User = require('../modele/Users')
var productsService = require('../service/products')
const router = express.Router();

router.get('/', function(req, res) {
    Product.find({}, function(err, products) {
        if (err) throw err;
      
        // object of all the products
        res.render('index', {products: products})
      });
 });

 router.get('/login', function(req, res) {
     res.render('login')
 })

 router.get('/404', function(req, res) {
     res.send('Unauthorized')
 })

 router.post('/check', function(req, res) {
    var username = req.body.username
    var password = req.body.password
    const prodct = User.find({ username: username, password: password }, function(err, user) {
        console.log(user)
        if(err) throw err;

        if(!Object.keys(user).length) {
            res.send('user not found!')
        } else {
            req.session.user = user[0].username;
            res.redirect('/')
            //res.redirect(`/order/${req.cookies.odrderId}`)
        }
    })
 })

 router.get('/order/:id', function(req, res) {
     var id = req.params.id;
     if(req.session.user === undefined){
        res.status(403)
        res.send()
     } else {
        productsService.orderProductById(id, function(product) {
        	console.log(product)
            res.send(product);
        })
     }
     
    /* var id = req.params.id;
    /* const prodct = await Product.find({ id: id }) */

     /* products.orderProductById(id, function(product) {
        res.send('ok');
    }) */
 
   /* Product.find({ id: id }, function(err, product) {
       if (err) throw err;
       // show the one product
       res.render('order', {product: product[0]})
    }); */
 })

 router.get('/logout', function(req, res) {
     req.session.user = undefined;
     res.send('lougout avec success!')
 })


router.get('/connect/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}));
 module.exports = router;