const express = require('express');
const router = express.Router();
const io = require('../index');

const Geoloc = require('../models/Geolocalization');
const Route = require('../models/Route')
const {isAuth} = require('../helpers/auth');

var lastRouteId = "";

router.get('/localization', isAuth, function(req, res) {
    res.render("localization/navigation-options");
});

io.on('connection', function(socket) {
    socket.on('new route', async function(route){
        const newRoute = new Route({
            user: route.user,
            name: route.name,
        });

        lastRouteId = newRoute.id;
        await newRoute.save();
    });
});

io.on('connection', function(socket){
    socket.on('new point', async function(point) {
        const newPoint = new Geoloc({
            idRoute: lastRouteId,
            latitude: point.latitude,
            longitude: point.longitude,
            user: point.user
        });

        await newPoint.save();
    });
});

router.get('/localization/previous-routes', isAuth, async function(req, res) {
    const localizations = await Route.find({user: req.user.id}).sort({date: 'desc'});
    res.render('localization/all-locs', {localizations});
});

router.post('/localization/share-loc', isAuth, function(req, res){
    req.flash('success_msm', 'Your route has been saved succesfully');
    res.redirect("/localization/previous-routes");    
})

router.get('/localization/watch-details/:id', isAuth, async function(req, res){
    const points = await Geoloc.find({idRoute: req.params.id}).sort({dateH: 'desc'});
    res.render('localization/watch-loc-details', {pointsArray: JSON.stringify(points), points});    
});

module.exports = router;