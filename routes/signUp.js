var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Volunteer = require('../models/volunteer').model;
var Campaign = require('../models/campaign');


/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.sendFile('');
//});

router.get('/', function(req,res,next){
  res.sendFile(path.resolve(__dirname, '../public/views/users/volunteerSignUp.html'));
});

//router.post('/',
//    passport.authenticate('local', {
//      successRedirect: '/views/users/signUpForm.html',
//      failureRedirect: '/'
//    })
//);

//router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
//router.get('/facebook/callback',
//    passport.authenticate('facebook', {
//        successRedirect : '/signUp',
//        failureRedirect : '/'
//    }));

router.post('/volunteersData', function (req, res, next){
    Campaign.findOne({campaignName: req.body.campaignSelect.campaignName} ,function(err, campaign){
        console.log('this is the campaign name: ', campaign);

        //Adds user to req.body so it can be passed into Volunteer model
        req.body.user = req.user;

        var volunteer = new Volunteer(req.body);

        campaign.volunteers.push(volunteer);

        campaign.save(function(err){
            if (err) throw err


        })



    });



    //Volunteers.create(req.body, function (err, post){
    //    if (err)
    //        next(err);
    //    else
    //        res.redirect('/');
    //});
    res.sendStatus(200);
});

// =====================================
// LOGOUT ==============================
// =====================================
//app.get('/logout', function(req, res) {
//    req.logout();
//    res.redirect('/');
//});



module.exports = router;
