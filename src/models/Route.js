const mongoose = require('mongoose');
const {Schema} = mongoose;

const routeSchema = new Schema({
    user: {type: String},
    name: {type: String},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Route', routeSchema);
