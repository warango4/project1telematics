const mongoose = require('mongoose');
const {Schema} = mongoose;

/**
 * This is a schema model to save data into MongoDB
 * Module mongoose is required to create the model
 * 
 * This specific schema refers to points of a route
 * Which means a route has multiple points
 * 
 * @param {String} idRoute - The route which this point belongs to
 * @param {String} user - The user that owns the current route and current points
 * @param {String} latitude - Latitude of the actual location
 * @param {String} longitude - Longitude of the actual location
 * @param {String} dateH - Date when the route is being tracking
 */

const localizationSchema = new Schema({
    idRoute: {type: String},
    user: {type: String},
    latitude: {type: String, required: true}, 
    longitude: {type: String, required: true},
    dateH: {type: Date, default: Date.now}
});

// This allows to export this model so it can be used in other 
// server files
module.exports = mongoose.model('GeoLoc', localizationSchema);
