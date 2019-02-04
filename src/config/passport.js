const passport = require('passport');
const passportLoc = require('passport-local').Strategy;

const User = require('../models/User')

passport.use(new passportLoc({
    usernameField: 'email'
}, async (email, password, done) => {
    const mail = await User.findOne({email: email});
    if (!mail){
        return done(null, false, {message: 'This email is not registered'});
    } else {
        const match = await userName.matchPass(password);
        if(match){
            return done(null, userName);
        } else {
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