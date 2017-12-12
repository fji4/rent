var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var User = require('../models/user');
var configAuth = require('./auth');


/**
* Specifies what strategy we'll use
*/
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Registration Strategy
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {
        process.nextTick(function () {
            User.findOne({'local.email': email}, function (err, user) {
                if (err) {
                    return done(err);
                } else if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.userPic = req.param.userPic;
                    newUser.local.name = req.param.name;
                    newUser.local.description = req.param.description;
                    newUser.local.ownedApt = req.param.ownedApt;
                    newUser.local.userPic = req.param.userPic;
                    //     name        : String,
                    //     description : String,
                    //     ownedApt   : {type:[String],default: []},
                    // wishList    : {type:[String],default: []},
                    // userPic     : String
                    newUser.save(function (err) {
                        if(err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        })
    })
    );

    // Login Strategy
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },
    function(email, password, done) {
        User.findOne({'local.email': email}, function(err, user) {
            if ( err ) {
                return done(err);
            } else if ( !user || !user.validPassword(password) ) {
                return done(null, false);
            }

            return done(null, user);
        });
    }));


    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL
    },
        function(accessToken, refreshToken, profile,done){
            // process.nextTick(function () {
                User.findOne({'google.id':profile.id},function(err,user){
                    if(err)
                        return done(err);
                    if(user){
                        return done(null,user);
                    }
                    else{
                        var newUser = new User();

                        // set all of the relevant information
                        newUser.google.id    = profile.id;
                        // newUser.google.token = token;
                        // newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                // })
            });
        }));


    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    }, // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {

            // asynchronous
            // process.nextTick(function() {

                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser            = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id
                        // newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if(err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            // });

        }));



};
