var express = require('express');
var path = require('path');

var Campaign = require('../models/campaign');
var Sizes = require('../models/sizes');
var Tester = require('../models/tester');

var router = express.Router();

router.put('/sizes', function(req, res, next) {

    var createObj = req.body.selectedSizes.sizes;

    Campaign.findOne({campaignName:req.body.selectedCampaign.campaignName}, function(err, campaign){
        Sizes.model.create(createObj, function (err, sizes) {

            if(err) throw err;

            if(!campaign.sizes){
                campaign.sizes = [];
            }
            campaign.sizes.push(sizes);

            campaign.save(function(err) {
                if(err) throw err;
            })
        });
    });

    res.sendStatus(200);
});

router.put('/postTesterArray', function(req, res, next){

    var createTesterObj = req.body;

    Campaign.findOne({campaignName:req.body.selectedCampaign.campaignName}, function(err, campaign) {
        Tester.model.create(createTesterObj, function (err, testers) {

            if (err) throw err;

            campaign.testers.push(testers);

            campaign.save(function (err) {
                if (err) throw err;
            });
        });
    });

    res.sendStatus(200);
});

router.get('/getVolunteers', function(req,res,next){

    Campaign.find(function(err,volunteers){
        res.json(volunteers);
    });
});

module.exports = router;