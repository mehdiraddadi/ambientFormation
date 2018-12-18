var express = require('express')
var app = express();
var ejs = require('ejs')
var bodyParser = require('body-parser')
var products = require('./products/products')
var fetch = require("node-fetch")
var db = require('./db/connection')
var Product = require('./modele/Products')
var DBMongoose = require('./db/connection')
var User = require('./modele/Users')
var session = require('express-session')
var cookieSession = require('cookie-session');

var cookieParser = require('cookie-parser')

app.set('view engine', 'ejs')
app.use(express.static('public'))

// pour les requetes post
/* app.use(bodyParser.json()) */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(cookieSession({
    httpOnly: false,
    keys: ['secretebook']
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
  
DBMongoose.connection(
    function(data){
        console.log(data)
    }
)

app.get('/', function(req, res) {
    Product.find({}, function(err, products) {
        if (err) throw err;
      
        // object of all the products
        res.render('index', {products: products})
      });
 });

 app.get('/login', function(req, res) {
     res.render('login')
 })

 app.get('/404', function(req, res) {
     res.send('Unauthorized')
 })

 app.post('/check', function(req, res) {
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

 app.get('/order/:id', function(req, res) {
     var id = req.params.id;
     if(req.session.user === undefined){
        res.status(403)
        res.send()
     } else {
        products.orderProductById(id, function(product) {
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

 app.get('/logout', function(req, res) {
     req.session.user = undefined;
     res.send('lougout avec success!')
 })

app.listen(3030, function () {
    console.log('Example app listening on port 3030!')
})