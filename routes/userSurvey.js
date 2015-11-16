var express = require('express');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var SurveyResults = require('../models/surveyResults');
var Tester = require('../models/tester.js');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/views/users/volunteerSurvey.html'));
});

//('/add', upload.single('file'), function(req, res, next) {

router.post('/photos/upload', upload.array('photos', 3), function (req, res, next) {
    //console.log('Body', request.body);
    //console.log('File', request.file);

    var createObj = request.body.formData;

    createObj.img = request.file;

    SurveyResults.model.create(createObj, function (err, survey) {

        if (err) throw err;

        Tester.findOne({_id: request.tester._id}, function (err, tester) {

            console.log('this is the tester', tester);
            console.log('this is the survey', survey);

            if (!tester.surveyResults) {
                tester.surveyResults = [];
            }

            tester.surveyResults.push(survey);

            tester.save(function (err) {
                if (err) throw err;
            })

        });
        response.sendStatus(200);
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