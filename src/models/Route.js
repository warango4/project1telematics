const mongoose = require('mongoose');
const {Schema} = mongoose;

/**
 * This is a schema model that allows the data base
 * to have a specific model to save routes
 * 
 * Each routes belongs to an user, the route has a name
 * and it also has the date it was created
 * 
 * @param {String} user - The user which the route is associated to
 * @param {String} name - The name of the current route
 * @param {Date} date - Date in which the route was created
 */

const routeSchema = new Schema({
    user: {type: String},
    name: {type: String},
    date: {type: Date, default: Date.now}
});

// This allows to export this model so it can be used in other 
// server files 
module.exports = mongoose.model('Route', routeSchema);
