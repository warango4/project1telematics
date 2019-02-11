const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');

router.get('/users/signin', function(req, res) {
    res.render('users/signin');
});

/**
 * If an user is attempting to login to the app, 
 * validates the user exists and has a correct password
 */
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/localization',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', function(req, res) {
    res.render('users/signup');
});

/** 
 * Allows an user to create a new user for the app
 * Takes the request body to create a new model schema for user
 * and validates all fields
 * 
 * @param {String} req - Request where all fields for creating an user are saved
 * @param {String} res - Response to the request
 * 
*/
router.post('/users/signup', async function(req, res){
    const {user, email, pass, passConf} = req.body;
    const errors = [];
    if(user.length < 1) {
        errors.push({text: 'Please, create an username.'});
    }

    if(pass != passConf){
        errors.push({text: 'It seems you have not typed the same password. Try again'});
    }

    if(pass.length < 4){
        errors.push({text: 'To make sure you have a strong password, it has to be longer than 4 digits. Try again'});
    }

    if(errors.length > 0){
        res.render('users/signup', {errors, user, email});
    } else {
        const userName = await User.findOne({user: user});
        const userMail = await User.findOne({email: email});

        if(userName){
            req.flash('failure_msm', 'Sorry, this user name is already taken');
            res.redirect('/users/signup');
        }         
        if (userMail){
            req.flash('failure_msm', 'You have already registered with this email');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({user, email, pass});
            newUser.pass = await newUser.encryptPass(pass);
            await newUser.save();
            req.flash('success_msm', 'Congrats! You are registered now');
            res.redirect('/users/signin'); 
        } 
    }
});

/**
 * Finishes session
 */
router.get('/users/logout',function(req, res){
    req.logout();
    req.flash('success_msm', 'You have successfully logged out');
    res.redirect('/');
});

module.exports = router;