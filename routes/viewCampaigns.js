var express = require('express');
var path = require('path');

var Campaign = require('../models/campaign');

var router = express.Router();

router.get('/getCampaigns', function(req, res, next){
    Campaign.find(function(err, campaigns){


        res.json(campaigns);
    })
});

router.get('/getTesters', function(req, res, next) {

    Campaign.find(function(err, campaigns){
        console.log('campaign from the view campaign js ', campaigns);

        if(err) throw err;
            res.json(campaigns);
    });
});

module.exports = router;
