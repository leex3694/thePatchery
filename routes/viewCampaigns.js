var express = require('express');
var path = require('path');

var Campaign = require('../models/campaign');

var router = express.Router();

router.get('/getCampaigns', function(req, res, next){
    Campaign.find(function(err, campaigns){

        console.log('This is the volunteer info'+ campaigns);
        res.json(campaigns);
    })
});


router.get('/getTesters', function(req, res, next) {

    var tester = req.body;

    User.findOne({_id : userId}, function(err, user){
        if(err) throw err;
        res.send(user.fabricStash);
        //response.sendStatus(200);
    });
});

module.exports = router;
