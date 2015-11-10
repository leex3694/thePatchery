/**
 * Created by usuario on 11/9/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var SurveyResults = require('../models/surveyResults');






router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/views/users/volunteerSurvey.html'));
});


router.post('/postSurveyResults', function(req, res, next){
    console.log("hit survey Post Route");
    var saveSurveyResults = new SurveyResults(req.body);
    console.log("this is surveyresult in server");
    console.log(saveSurveyResults);
    saveSurveyResults.save(function(err){
        if(err)throw err;
        console.log("error : ", err);
        console.log("almost the end");
        //res.send(saveSurveyResults);
    });
    console.log("finished survey post route")
});


module.exports = router;