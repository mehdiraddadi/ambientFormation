const express = require('express');
const passport = require('passport');
const productsService = require('../service/products');
const router = express.Router();

router.get('/', async function(req, res) {
    var currentUser = null
    console.log('/home', req.user)
    if(req.user != undefined) {
        req.session.user = req.user
        currentUser = req.user
    }
    console.log(currentUser)
    var products = await productsService.getAllProducts()
    res.render('index', {products: products, userId: currentUser})
 });

 router.get('/login', function(req, res) {
    if(req.session.user != undefined) {
        res.redirect('/')
    } else {
        res.render('login')
    }
     
 })

 router.get('/404', function(req, res) {
     console.log(req.user)
     console.log(req.session.user )
     res.send('Unauthorized')
 })

 router.post('/check',passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res, next) {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
 })

 router.get('/order/:id', async function(req, res) {
     var id = req.params.id;
     console.log('/order', req.user)
     if(req.user === undefined){
        res.status(403)
        res.send()
     } else {
        var order = await productsService.addOrder(id, req.user._id)
        res.send(order);
     }
 })

 router.get('/logout', (req, res, next) => {
    req.session.user = undefined
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/order/list/:user_id', async function(req, res) {
    var userId = req.params.user_id;
    var orders = await productsService.getUserProducts(userId)
    var total = 0
    orders.forEach(order => {
        total = (total+order.price) 
    });
    res.render('order', {orders: orders, total: total})
 })

 router.get('/connect/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}));

router.post('/success', function(req, res) {
    res.redirect('/')
})

router.get('/register', function(req, res) {
    res.render('register')
})

router.get('/auth/facebook',
  passport.authenticate('facebook'));
 
  router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;