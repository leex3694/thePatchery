var mongoose = require('mongoose');
var UserSchema = require('./user').schema;
var Schema = mongoose.Schema;

var surveySchema = new Schema ({
    user:[UserSchema],
    question1: String,
    question2: String,
    question3: String,
    question4a: String,
    question4b: String,
    question5: String,
    question6: String,
    file: Object,
    imgBack: Object,
    imgSide: Object
});

var Survey = mongoose.model('Survey', surveySchema);

exports.schema = surveySchema;
exports.model = Survey;
