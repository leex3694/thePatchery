var express = require('express');
var router = express.Router();
var path = require('path');
var Campaign = require('../models/campaign');
var Sizes = require('../models/sizes');
var Tester = require('../models/tester');
var api_key = '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';
var sendgrid  = require('sendgrid')(api_key);


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
    console.log("the requst body is ",createTesterObj);
    Campaign.findOne({campaignName:req.body.selectedCampaign.campaignName}, function(err, campaign) {
        Tester.model.create(createTesterObj, function (err, testers) {
            if (err) throw err;
            campaign.testers.push(testers);

            console.log("these are the testers", testers.volunteer1.length);

            for(var i =0; i < testers.volunteer1.length; i++){

                var to_address = testers.volunteer1[i].email;
                console.log('this is the address of' ,to_address);

                //This is the start of the email functionality
                sendgrid.send({
                    to:       to_address,
                    from:     'briandmpls@gmail.com',
                    subject:  'This is a test from our group project',
                    text:     'Please reply if it makes it to you.'
                }, function(err, json) {
                    if (err) { return res.send("email error"); }
                    //res.send("email success");
                    console.log("email sent");
                });
            };



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