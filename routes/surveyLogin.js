var express = require('express');
var passport = require('passport');
var path = require('path');

var router = express.Router();

router.get('/', function(req,res,next){
    res.sendFile(path.resolve(__dirname, '../public/views/surveyLogin.html'));
});

router.get('/facebook', passport.authenticate('surveyLogin', { scope : 'email' }));

router.get('/facebook/callback',
    passport.authenticate('surveyLogin', {
        successRedirect : '/userSurvey',
        failureRedirect : '/'
    }));

module.exports = router;