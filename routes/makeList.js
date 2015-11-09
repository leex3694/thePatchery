var express = require('express');
var router = express.Router();
var path = require('path');
var Campaign = require('../models/campaign');
var Sizes = require('../models/sizes');


router.post('/sizes', function(request, response, next) {

    var createObj = request.body.sizeData;



    Sizes.model.create(createObj, function (err, sizes) {
        //console.log(swatch);
        //console.log(request.user);

        if(err) throw err;

        Campaign.findOne({campaignName:req.campaign.campaignName}, function(err, campaign){

            console.log('This is the campaign name: ',campaign);


            if(!campaign.sizes){
                campaign.sizes = [];
            }

            campaign.sizes.push(sizes);

            campaign.save(function(err) {
                if(err) throw err;
            })

        });
        response.sendStatus(200);
    });
});

router.get('/getVolunteers', function(request,response,next){
    Campaign.find(function(err,volunteers){
        console.log('This is the volunteer info'+ volunteers);
        response.json(volunteers);
    })


});
module.exports = router;