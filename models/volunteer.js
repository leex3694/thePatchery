var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var volunteerSchema = new Schema ({
    name: String,
    street: String,
    city: String,
    state: String,
    zip: Number,
    email: String,
    gender: String,
    size: String,
    sizeQualifying: String
});

var Volunteer = mongoose.model('Volunteer', volunteerSchema);

exports.schema = volunteerSchema;
exports.model = Volunteer;