var mongoose = require('mongoose');
var userSchema = require('./user').schema;

var Schema = mongoose.Schema;

var volunteerSchema = new Schema ({
    user: [userSchema],
    name: String,
    street: String,
    city: String,
    state: String,
    zip: Number,
    email: String,
    gender: String,
    size: String,
    sizeQualifying: String,
    campaignSelected: String
});

var Volunteer = mongoose.model('Volunteer', volunteerSchema);

exports.schema = volunteerSchema;
exports.model = Volunteer;