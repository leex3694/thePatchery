var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');


/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.sendFile('');
//});

router.get('/', function(req,res,next){
  res.sendFile(path.resolve(__dirname, '../public/views/volunteerSignUp.html'));
});

router.post('/',
    passport.authenticate('local', {
      successRedirect: '/views/signUpForm.html',
      failureRedirect: '/'
    })
);

module.exports = router;
