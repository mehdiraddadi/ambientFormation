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
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

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



  passport.use(new GoogleStrategy({
      clientID:   config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
      passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));

  passport.use(new FacebookStrategy({
      clientID:   config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
    DBMongoose.connection(
        function(data){
            console.log(data)
        }
    )

    var routes = require('./router/router');
    app.use('/', routes);
app.listen(3030, function () {
    console.log('Example app listening on port 3030!')
})

