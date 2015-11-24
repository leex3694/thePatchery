var express = require('express');
var path = require('path');

var api_key = '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';
var sendgrid  = require('sendgrid')(api_key);

var router = express.Router();

router.post('/sentEmail', function(req,res, next){
    console.log('sentEmail Working');

    sendgrid.send({
        to:       'briandaves@earthlink.net',
        from:     'briandmpls@gmail.com',
        subject:  'This is a test from our group project',
        text:     'Congratulations! You have been chosen to test childrens clothes.'
    }, function(err, json) {
        if (err) { return res.send("email error"); }
            res.send(" email success");
    });

});


module.exports = router;