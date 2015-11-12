var express = require('express');
var router = express.Router();
var path = require('path');
var Campaign = require('../models/campaign');
var Sizes = require('../models/sizes');


router.put('/sizes', function(req, res, next) {

    var createObj = req.body.selectedSizes.sizes;

    console.log(req.body);

    Campaign.findOne({campaignName:req.body.selectedCampaign.campaignName}, function(err, campaign){

        console.log(campaign);

        Sizes.model.create(createObj, function (err, sizes) {

            if(err) throw err;

            console.log('This is the campaign name: ',campaign);

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

router.get('/getVolunteers', function(req,res,next){
    Campaign.find(function(err,volunteers){

        console.log('This is the volunteer info'+ volunteers);
        res.json(volunteers);
    });
});
module.exports = router;