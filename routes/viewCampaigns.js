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

module.exports = router;
