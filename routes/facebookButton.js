var express = require('express');
var passport = require('passport');
var path = require('path');

var router = express.Router();

router.get('/', function(req,res,next){
    res.sendFile(path.resolve(__dirname, '../public/views/facebook.html'));
});

router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/signUp',
        failureRedirect : '/'
    }));

module.exports = router;