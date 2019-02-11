const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const override = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Initializations
const application = express();
require('./database');
require('./config/passport');

// Enable socket.io 
const server = require('http').Server(application);
const io = require('socket.io').listen(server);
module.exports = io;

// Settings
application.set('port', process.env.PORT || 3000);
application.set('views', path.join(__dirname, 'views'));

application.engine('.hbs', exphbs({
    defaultLayout: 'main', 
    layoutsDir: path.join(application.get('views'), 'layouts'),
    partialsDir: path.join(application.get('views'), 'partials'),
    extname: '.hbs'
}));

application.set('view engine', '.hbs');

// Middlewares
application.use(express.urlencoded({extended: false}));
application.use(override('__method'));
application.use(session({
    secret: 'this is my secret',
    resave: true,
    saveUninitialized: true
}));

application.use(passport.initialize());
application.use(passport.session());
application.use(flash());

// Global variables
application.use(function(req, res, next) {
    res.locals.success_msm = req.flash('success_msm');
    res.locals.failure_msm = req.flash('failure_msm');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes
application.use(require('./routes/index'));
application.use(require('./routes/users'));
application.use(require('./routes/geoloc'));

// Static files
application.use(express.static(path.join(__dirname, 'public')));

// Server is listening
server.listen(application.get('port'), () => {
    console.log('Server on port', application.get('port'))
});

