//SM/BD - Passport Information should go here

var mongoose = require('mongoose');
var testerSchema = require('./tester').schema;
var volunteerSchema = require('./volunteer').schema;

var Schema = mongoose.Schema;

var campaignSchema = new Schema ({
    campaignName: String,
    volunteers: [volunteerSchema],
    testers: [testerSchema],
    signupStart: Date,
    signupEnd: Date,
    surveyStart: Date,
    surveyEnd: Date
});

var Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;