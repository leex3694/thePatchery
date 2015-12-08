var express = require('express');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var SurveyResults = require('../models/surveyResults');
var Campaign = require('../models/campaign');
var Tester = require('../models/tester');
var User = require('../models/user');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/views/users/volunteerSurvey.html'));
});

//BEGIN FILE UPLOADING

router.post('/add', upload.single('file'), function (req, res, next) {
    var createObj = req.body.formData;
    var campaignName1 = req.body.campaignName;

    //ADDS FILE UPLOAD INFORMATION TO BODY
    createObj.file = req.file;
        console.log('Body with image ', createObj);

    //ADDS USER INFORMATION TO BODY
    createObj.user = [req.user];
        console.log('user data' , createObj.user);

    Campaign.findOne({campaignName:campaignName1} ,function(err, campaign){
        if (err) throw err;
        var foundTester = {};

        for(var i = 0; i < campaign.testers[0].volunteer1.length; i++){
            console.log("length ",campaign.testers[0].volunteer1.length);
            console.log("campaign testers facebook id ",campaign.testers[0].volunteer1[i].user[0].facebook.id);
            console.log("req.user facebook id ",req.user.facebook.id);


                // Right now this line doesn't evaluate to be true ??????
            if (campaign.testers[0].volunteer1[i].user[0].facebook.id == req.user.facebook.id){

            foundTester = campaign.testers[0].volunteer1[i].user[0].facebook.id;
                console.log('found Tester ', foundTester);

            SurveyResults.model.create(createObj, function (err, survey) {

                campaign.testers[0].surveyResults.push(survey);
                    console.log(campaign.testers[0].surveyResults);

                campaign.save(function(err) {
                    if (err) throw err
                });
            });
            res.sendStatus(200);
            }
        };
    });
});

module.exports = router;