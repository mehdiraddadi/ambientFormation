var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var productsService = require('./service/products')
var DBMongoose = require('./db/connection')
var User = require('./modele/Users')
var config = require('./config/config')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session')
var cookieParser = require('cookie-parser')
app.use(express.static('public'))
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
  
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.password == password) { return done(null, false); }
            return done(null, user);
        });
    }
)); 
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

  var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

  passport.use(new GoogleStrategy({
      clientID:     '960465279631-73jgd1ffac2v381li10mps9sd4nasali.apps.googleusercontent.com',
      clientSecret: '6YYJR8It0DvAfJh1mj-vHIt-',
      callbackURL: "http://yourdormain:3000/auth/google/callback",
      passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));





  global.userSession = null;
DBMongoose.connection(
    function(data){
        console.log(data)
    }
)

app.get('/', async function(req, res) {
    console.log('/home', req.user)
    var products = await productsService.getAllProducts()
    res.render('index', {products: products})
 });

 app.get('/login', function(req, res) {
     res.render('login')
 })

 app.get('/404', function(req, res) {
     res.send('Unauthorized')
 })

 app.post('/check',passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res, next) {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
 })

 app.get('/order/:id', async function(req, res) {
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

 app.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

 app.get('/order/list/:user_id', async function(req, res) {
    var userId = req.params.user_id;
    var orders = await productsService.getUserProducts(userId)
    res.send(orders)
 })

app.listen(3030, function () {
    console.log('Example app listening on port 3030!')
})

app.get('/connect/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}));