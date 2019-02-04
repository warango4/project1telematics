const express = require('express');
const router = express.Router();

const Geoloc = require('../models/Geolocalization');

router.get('/localization/previous-routes', function(req, res) {
    res.render('localization/share-loc');
});

router.post('/localization/share-loc', async function(req, res) {
    const {latitude, length, hour, date} = req.body;
    const errors = [];
    if(!latitude || !length || !hour || !date){
        errors.push({text: 'Either you have not filled a field or you have filled it wrong'});
    }
    if(errors.length > 0){
        res.render('localization/share-loc', {
            errors,
            //user,
            latitude,
            length, 
            hour, 
            date
        });
    } else {
        const newLoc = new Geoloc({latitude, length, hour, date});
        console.log(newLoc);
        await newLoc.save();
        req.flash('success_msm', 'Your route has been saved succesfully');
        res.redirect("/localization");
    }
});

router.get('/localization', async function(req, res) {
    const localizations = await Geoloc.find().sort({dateH: 'desc'});
    res.render("localization/all-locs", {localizations});
});

router.get('/localization/watch-details/:id', async function(req, res){
    const consult = await Geoloc.findById(req.params.id);
    res.render('localization/watch-loc-details', {consult});    
});

module.exports = router;