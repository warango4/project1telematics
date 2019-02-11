const passport = require('passport');
const passportLoc = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * Method to find if email is registered
 * and password matches with email
 * 
 * If email is not registered, returns error
 * If password is not related to email, returns error
 */

passport.use(new passportLoc({
    usernameField: 'email',
    passwordField: 'pass'
}, async (email, pass, done) => {
    const mail = await User.findOne({email: email});
    //Email not registered
    if (!mail){
        return done(null, false, {message: 'This email is not registered'});
    } else {
        const match = await mail.matchPass(pass);
        if(match){
            return done(null, mail);
        } else {
            //Pass does not match email
            return done(null, false, {message: 'That is not your password. Try again.'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
}); 

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});