const mongo = require('mongoose');

/**
 * Database connection.
 * It creates a database inside mongo and connects it 
 * to the app so all model schemas can be saved
 * and there is persistence of data, since Docker does not
 * have it
 */

mongo.connect('mongodb://mongo-server:27017/geoloc-db-app', {
    useCreateIndex: true, 
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));
