var express = require('express');
var router = express.Router();
var path = require('path');
var Campaign = require('../models/campaign');
var Sizes = require('../models/sizes');


router.put('/sizes', function(req, res, next) {

    var createObj = request.body.formData;



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
        res.sendStatus(200);
    });
});

router.get('/getVolunteers', function(req,res,next){
    Campaign.find(function(err,volunteers){
<<<<<<< HEAD
        //console.log('This is the volunteer info'+ volunteers);
        response.json(volunteers);
=======
        console.log('This is the volunteer info'+ volunteers);
        res.json(volunteers);
>>>>>>> 3a29fbf79db068bf10a0085a30a1072b7b3f0d9f
    })


});
module.exports = router;