var express = require('express');
var router = express.Router();
var path = require('path');
var api_key = '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';
var sendgrid  = require('sendgrid')(api_key);


router.post('/sentEmail', function(req,res, next){
    console.log('ok this works');

sendgrid.send({
    to:       'briandaves@earthlink.net',
    from:     'briandmpls@gmail.com',
    subject:  'Hello World',
    text:     'My first email through SendGrid.'
}, function(err, json) {
    if (err) { return res.send("email error"); }
    res.send(" email success");
});

});


module.exports = router;