/**
 * Created by usuario on 11/7/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Campaign = require('../models/campaign');


router.post('/postCreateCampaignData', function(req, res, next){
   var saveNewCampaign = new Campaign(req.body);
    saveNewCampaign.save(function(err){
        if(err)throw err;
        console.log("error : ", err);
        res.send(saveNewCampaign);
    })
});

router.get('/getCreatedCampaign', function (req, res, next){
    Campaign.find(function(err, newCampaign) {
        console.log("this is the newest Campaign " + newCampaign);
        res.json(newCampaign);
    })
});



module.exports = router;