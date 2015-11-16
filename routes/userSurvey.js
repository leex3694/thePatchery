var express = require('express');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var SurveyResults = require('../models/surveyResults');
var Tester = require('../models/tester.js').model;

var router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/views/users/volunteerSurvey.html'));
});

//('/add', upload.single('file'), function(req, res, next) {
//upload.array('photos', 3)

router.post('/add', upload.single('file'), function (req, res, next) {
    console.log('Body', req.body);
    //console.log('ID', req.tester.volunteer1.user.facebook.id);
    var id = 0;
    var createObj = req.body.formData;

    createObj.img = req.file;

    //HACK! Remove before deploy
console.log('this is the User ', req.user);
    if(req.user){
        console.log('user in if statement ', user);
        id = req.volunteer1.user.facebook.id;
    } else {
        id = 10156278342525055;
    }

    SurveyResults.model.create(createObj, function (err, survey) {

        if (err) throw err;

        Tester.findOne({_id: id}, function (err, tester) {

            console.log('this is the tester', tester);
            console.log('this is the id ', id)
            console.log('this is the survey', survey);

            //if (!tester.surveyResults) {
            //    tester.surveyResults = [];
            //}

            tester.surveyResults.push(survey);

            tester.save(function (err) {
                if (err) throw err;
            })

        });
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