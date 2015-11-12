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

    //var tester = req.body;

    Campaign.find(function(err, campaign){
        if(err) throw err;
        res.send(campaign.testers);
        //response.sendStatus(200);
    });
});

module.exports = router;
