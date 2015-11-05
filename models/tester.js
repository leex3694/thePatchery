var mongoose = require('mongoose');
var volunteerSchema = require('./volunteer').schema;
var surveySchema = require('./surveyResults').schema;

var Schema = mongoose.Schema;

var testerSchema = new Schema ({
    //SM - Not sure if this will just bring in one volunteer
    volunteer: [volunteerSchema],
    surveyResults: [surveySchema]
});

var Tester = mongoose.model('Tester', testerSchema);

exports.schema = testerSchema;
exports.model = Tester;