const mongo = require('mongoose');

mongo.connect('mongodb://localhost/geoloc-db-app', {
    useCreateIndex: true, 
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));