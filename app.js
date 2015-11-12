var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('./models/user');
var routes = require('./routes/index');
var signUp = require('./routes/signUp');
var register = require('./routes/register');
var email= require('./routes/email');
var users = require('./routes/users');
var createCampaign = require('./routes/createCampaign');
var something = require ('./routes/auth');
var makeList = require('./routes/makeList');
var viewCampaigns = require('./routes/viewCampaigns');
var userSurvey = require('./routes/userSurvey');

var app = express();



var mongoURI = "mongodb://localhost:27017/thepatchery";
//var mongoURI = "mongodb://patches:kids_clothes@ds053194.mongolab.com:53194/the_patchery"
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
  console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open');
});


// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use(session({
  secret: 'secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60000, secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new localStrategy({passReqToCallback : true, usernameField: 'username'},
    function(request, username, password, done) {
      User.findOne({username:username}, function(err, user){

        if(err) throw err;
        if(!user){
          return done(null, false, {message: 'Incorrect username or password'});
        }
        user.comparePassword(password, function(err, isMatch){
          if(err) throw err;
          if(isMatch){
            return done(null, user);
          }else{
            done(null, false, {message: 'Incorrect username or password'});
          }
        });
      });
    }));

//FACEBOOK BELOW

passport.use(new FacebookStrategy({
      clientID: 711298905667165,
      clientSecret: 'fbf9bc40358b4b2a03ca8c07934a7b63',
      callbackURL: "http://localhost:3000/signUp/facebook/callback",
      profileFields: ["emails", "displayName", "name"]
    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

      // asynchronous
      process.nextTick(function() {

        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);

          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();

            // set all of the facebook information in our user model
            newUser.facebook.id    = profile.id; // set the users facebook id
            newUser.facebook.token = token; // we will save the token that facebook provides to the user
            newUser.facebook.name  = profile.name.displayName; // look at the passport user profile to see how names are returned
            newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

            // save our user to the database
            newUser.save(function(err) {
              if (err)
                throw err;

              // if successful, return the new user
              return done(null, newUser);
            });
          }

        });
      });

    }));


//PASSPORT

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user){
    if(err) done(err);
    done(null,user);
  });
});


app.use('/', routes);
app.use('/signUp', signUp);
app.use('/register', register);
app.use('/email', email);
app.use('/createCampaign', createCampaign);
app.use('/viewCampaigns', viewCampaigns);
app.use('/makeList',makeList);
app.use('/userSurvey', userSurvey);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
