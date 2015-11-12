var express = require('express');
var router = express.Router();
var path = require('path');
var Campaign = require('../models/campaign');
var Sizes = require('../models/sizes');
var Tester = require('../models/tester');


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
    var createTesterObj = req.body.testerArray;
    console.log(createTesterObj);
    //Campaign.findOne({campaignName:req.body.selectedCampaign.campaignName}, function(err, campaign) {
    //    Tester.model.create(createTesterObj, function (err, testers) {
    //        console.log('at least getting here ');
    //        if (err) throw err;
    //        console.log('This is the campaign name: ', campaign.campaignName);
    //        //campaign.testers.volunteer.push();
    //        campaign.testers.volunteer1.push(testers);
    //        campaign.save(function (err) {
    //            console.log('this should be the testers being saved');
    //            console.log(campaign.testers);
    //            if (err) throw err;
    //        });
    //    });
    //});
    res.sendStatus(200);
});



router.get('/getVolunteers', function(req,res,next){
    Campaign.find(function(err,volunteers){

        //console.log('This is the volunteer info'+ volunteers);
        res.json(volunteers);
    });
});
module.exports = router;