const express = require('express');
const router = express.Router();

router.get('/users/signin', function(req, res) {
    res.render('users/signin');
});

router.get('/users/signup', function(req, res) {
    res.render('users/signup');
});

router.post('/users/signup', function(req, res){
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
        res.send('OK');
    }
});
module.exports = router;