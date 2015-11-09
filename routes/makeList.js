/**
 * Created by briandaves on 11/9/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Campaign = require('../models/campaign');
var Sizes = require('..models/sizes');


router.post('/sizes', function(request, response, next) {

    var createObj = request.body.swatchData;

    createObj.img = request.file;

    Swatch.model.create(createObj, function (err, swatch) {
        //console.log(swatch);
        //console.log(request.user);

        if(err) throw err;

        Campaign.findOne({campaignName:req.campaign.campaignName}, function(err, name){

            console.log('This is the campaign name: ',name);


            if(!user.fabricStash){
                user.fabricStash = [];
            }

            names.sizes.push(sizes);

            user.save(function(err) {
                if(err) throw err;
            })

        });
        response.sendStatus(200);
    });
});
//router.post('/sizes/:campaignName', function(req,res,next){
//    //var sizes = new Campaign(req.body);
//    //saveNewList.save(function(err){
//    //    if(err)throw err;
//    //    console.log("error : ", err);
//    //    res.send(saveNewList);
//    //})
//    if
//    Campaign.findOne({campaignName:req.campaign.campaignName}, function(err, name){
//
//        console.log('This is the campaign name: ',name);
//
//
//        if(!name.sizes){
//            name.sizes = [];
//        }
//
//        name.sizes.push()
//
//
//
//
//
//    }
//})