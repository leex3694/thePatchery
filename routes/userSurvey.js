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



router.post('/add', upload.single('file'), function (req, res, next) {
    console.log('Body', req.body);
    var createObj = req.body.formData;
    var campaignName1 = req.body.campaignName;

    createObj.file = req.file;
    console.log('Body with image ', createObj);


        //currently finding campaign and posting to the testers in the selected campaign, but needs to be updated to go by Tester
        Campaign.findOne({campaignName:campaignName1} ,function(err, campaign){

                console.log("Trying to find facebook user id",campaign.testers[0].volunteer1[0].user[0].facebook.id);

            if (err) throw err;

            //    This is the facebook thing that Joel was helping out with...not currently working well
            var foundTester = {};

            for(var i = 0; i < campaign.testers.length; i++){
                console.log('campaign testesrs ' , campaign.testers);

                if (campaign.testers[0].volunteer1[i].user[0].facebook.id === req.user.facebook.id){
                    //console.log('It\'s a match ', req.user.facebook.id, campaign.testers.volunteer1[i].user[0].facebook.id);
                    foundTester = campaign.testers.volunteer1[i].user[0].facebook.id;
                    console.log('found Tester ', foundTester);

                    SurveyResults.model.create(createObj, function (err, survey) {

                        campaign.testers.surveyResults[i].push(survey); //THis is a hacky way to get it to post to the first person, needs to go by Tester
                        console.log(campaign.testers[0].surveyResults);
                        campaign.save(function(err) {
                            if (err) throw err
                        });
                    });

                }

        };


    });
});



module.exports = router;