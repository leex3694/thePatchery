/**
 * Created by usuario on 11/7/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');


router.post('/postCreateCampaignData', function(req, res, next){
   console.log('hit the router');
    console.log(req.body);
});



module.exports = router;