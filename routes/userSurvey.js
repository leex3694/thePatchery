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

//('/add', upload.single('file'), function(req, res, next) {
//upload.array('photos', 3)



router.post('/add', upload.single('file'), function (req, res, next) {
    console.log('Body', req.body);
    var createObj = req.body.formData;
    var campaignName1 = req.body.campaignName;

    createObj.file = req.file;
    console.log('Body with image ', createObj);


        //currently finding campaign and posting to the testers in the selected campaign, but needs to be updated to go by Tester
        Campaign.findOne({campaignName:campaignName1} ,function(err, campaign){
            //console.log('testerssss ', campaign.testers[0].surveyResults);
            SurveyResults.model.create(createObj, function (err, survey) {
                campaign.testers[0].surveyResults.push(survey); //THis is a hacky way to get it to post to the first person, needs to go by Tester


                campaign.save(function(err) {
                    if (err) throw err
                });



            if (err) throw err;

            //    This is the facebook thing that Joel was helping out with...not currently working well
            var foundTester = {};
            //
            for(var i = 0; i < campaign.testers.length; i++){
                console.log('campaign testesrs ' , campaign.testers);
            }
            //    if (campaign.testers[i].id == req.user.facebook.id){
            //        foundTester = campaign.testers[i];
            //        console.log('found Tester ', foundTester);
            //    }
            //    console.log('does not match ', req.user.facebook.id, campaign.testers[i].id);
            //}

        });

    ///////////////////End of Campaign FindOne Issue/////////////////////////////////

        //Tester.findOne({_id: id}, function (err, tester) {
        //
        //    console.log('this is the tester', tester);
        //    console.log('this is the id ', id);
        //    console.log('this is the survey', survey);
        //
        //    //if (!tester.surveyResults) {
        //    //    tester.surveyResults = [];
        //    //}
        //
        //    tester.surveyResults.push(survey);
        //
        //    tester.save(function (err) {
        //        if (err) throw err;
        //    })
        //
        //});
        res.sendStatus(200);
    });
});





//router.post('/postSurveyResults', function(req, res, next){
//    console.log("hit survey Post Route");
//    var saveSurveyResults = new SurveyResults(req.body);
//    console.log("this is surveyresult in server");
//    console.log(saveSurveyResults);
//    saveSurveyResults.save(function(err){
//        if(err)throw err;
//        console.log("error : ", err);
//        console.log("almost the end");
//        //res.send(saveSurveyResults);
//    });
//    console.log("finished survey post route")
//});


module.exports = router;