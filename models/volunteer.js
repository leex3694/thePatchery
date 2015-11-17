var mongoose = require('mongoose');
var UserSchema = require('./user').schema;

var Schema = mongoose.Schema;

var volunteerSchema = new Schema ({
    user: [UserSchema],
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