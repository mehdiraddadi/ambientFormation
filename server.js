var express = require('express')
var bodyParser = require('body-parser')
var productsService = require('./service/products')
var DBMongoose = require('./db/connection')
var config = require('./config/config')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session')
var cookieParser = require('cookie-parser')
var methodOverride = require('method-override')
var restify = require('express-restify-mongoose')
var routes = require('./routes/routes')
var Bcrypt = require('bcrypt')

var app = express();

var router = express.Router()


app.use(express.static('public'))
app.use(cookieParser());
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
  
app.use('/', routes);

app.use(bodyParser.json())
app.use(methodOverride());

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
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
      clientID:     '960465279631-7081rbm1r3dchh7ao8g1rt7fbba1hl6b.apps.googleusercontent.com',
      clientSecret: 'Gm8ZKpzOpwMrjW93jQtc88Wm',
      callbackURL: "http://localhost:8080/auth/google/callback",
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

var productRouter = require('./routes/product.router')(router)
var userRouter = require('./routes/user.router')(router)
app.use(router)

// debug router
/* console.log(app._router.stack)
console.log(router.stack) */
app.listen(8080, 'ebookstore.dev', function () {
    console.log('Example app listening on port 8080!')
})
