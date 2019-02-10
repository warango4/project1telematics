const mongo = require('mongoose');

mongo.connect('mongodb://mongo-server:27017/geoloc-db-app', {
    useCreateIndex: true, 
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));
