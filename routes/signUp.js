var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');


/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.sendFile('');
//});

router.get('/', function(req,res,next){
  res.sendFile(path.resolve(__dirname, '../public/views/users/volunteerSignUp.html'));
});

router.post('/',
    passport.authenticate('local', {
      successRedirect: '/views/users/signUpForm.html',
      failureRedirect: '/'
    })
);


router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/views/signUpForm.html',
        failureRedirect : '/'
    }));

// =====================================
// LOGOUT ==============================
// =====================================
//app.get('/logout', function(req, res) {
//    req.logout();
//    res.redirect('/');
//});



module.exports = router;
