


module.exports = {

    'facebookAuth': {
        'clientID': 711298905667165, // your App ID
        'clientSecret': 'fbf9bc40358b4b2a03ca8c07934a7b63', // your App Secret
        'callbackURL': 'http://localhost:3000/signUp/facebook/callback'
    }
};


//passport.use(new FacebookStrategy({
//    clientID: 711298905667165,
//    clientSecret: 'fbf9bc40358b4b2a03ca8c07934a7b63',
//    callbackURL: "http://localhost:3000/signUp/facebook/callback",
//    profileFields: ["emails", "displayName", "name"]
//}