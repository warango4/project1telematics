const mongoose = require('mongoose');
const {Schema} = mongoose;

var dateHelper = new Date();
var time = dateHelper.getUTCHours();

const localizationSchema = new Schema({
    //user: {type: String, required: true},
    latitude: {type: String, required: true}, 
    length: {type: String, required: true},
    hour: {type: String, required: true},
    date: {type: Date, required: true},
    dateH: {type: Date, default: Date.now}
});

module.exports = mongoose.model('GeoLoc', localizationSchema);
