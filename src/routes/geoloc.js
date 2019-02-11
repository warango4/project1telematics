const express = require('express');
const router = express.Router();
const io = require('../index');

const Geoloc = require('../models/Geolocalization');
const Route = require('../models/Route')
const {isAuth} = require('../helpers/auth'); //Function to validate authentication

var lastRouteId = ""; //ID to match point to a route

router.get('/localization', isAuth, function(req, res) {
    res.render("localization/navigation-options");
});

/**
 * Socket.io connection to save routes in database
 * 
 * @param {Socket} socket - socket to create connection between app and database
 */
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

/**
 * Socket.io connection to save points in database
 * Each point gets associated to a route
 * 
 * @param {Socket} socket - socket to create connection between app and databas
 */
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

/**
 * Finds routes per user and show them in descendant order
 */
router.get('/localization/previous-routes', isAuth, async function(req, res) {
    const localizations = await Route.find({user: req.user.id}).sort({date: 'desc'});
    res.render('localization/all-locs', {localizations});
});

router.post('/localization/share-loc', isAuth, function(req, res){
    req.flash('success_msm', 'Your route has been saved succesfully');
    res.redirect("/localization/previous-routes");    
});

/**
 * Finds points per route and show them in descendant order
 */
router.get('/localization/watch-details/:id', isAuth, async function(req, res){
    const points = await Geoloc.find({idRoute: req.params.id}).sort({dateH: 'desc'});
    res.render('localization/watch-loc-details', {pointsArray: JSON.stringify(points), points});    
});

module.exports = router;