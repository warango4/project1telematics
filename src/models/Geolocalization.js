const mongoose = require('mongoose');
const {Schema} = mongoose;

const localizationSchema = new Schema({
    idRoute: {type: String},
    user: {type: String},
    latitude: {type: String, required: true}, 
    longitude: {type: String, required: true},
    dateH: {type: Date, default: Date.now}
});

module.exports = mongoose.model('GeoLoc', localizationSchema);
