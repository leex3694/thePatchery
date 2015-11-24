var express = require('express');
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

var router = express.Router();

router.get('/', function(req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/views/users/volunteerRegister.html'));
});

router.post('/', function(req,res,next) {
    Users.create(req.body, function (err, post) {
        if (err)
            next(err);
        else
            res.redirect('/signUp');
    })
});

module.exports = router;
