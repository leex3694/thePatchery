var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surveySchema = new Schema ({
    volunteerId: Schema.Types.ObjectId,
    question1: String,
    question2: String,
    question3: String,
    question4a: String,
    question4b: String,
    question5: String,
    question6: String,
    imgFront: Object,
    imgBack: Object,
    imgSide: Object
});

var Survey = mongoose.model('Survey', surveySchema);

//exports.schema = surveySchema;
//exports.model = Survey;
module.exports = Survey;