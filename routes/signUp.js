var express = require('express');
var passport = require('passport');
var path = require('path');
var Volunteer = require('../models/volunteer').model;
var Campaign = require('../models/campaign');
var User = require('../models/user');

var router = express.Router();

router.get('/', function(req,res,next){
  res.sendFile(path.resolve(__dirname, '../public/views/users/volunteerSignUp.html'));
});

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
    res.sendStatus(200);
});

 //=====================================
 //LOGOUT ==============================
 //=====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/facebookButton');
});

module.exports = router;
