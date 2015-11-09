var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sizesSchema = new Schema ({
    twoT: Boolean,
    threeT: Boolean,
    fourT: Boolean,
    fiveT: Boolean,
    six: Boolean,
    seven_eight: Boolean,
    nine_ten: Boolean

});






var Sizes = mongoose.model('Sizes', sizesSchema);

exports.schema = sizesSchema;
exports.model = Sizes;
