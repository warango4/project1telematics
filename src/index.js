const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const override = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const gps = require('gps-tracking');

const application = express();
require('./database');
require('./config/passport');

application.set('port', process.env.PORT || 3000);
application.set('views', path.join(__dirname, 'views'));

application.engine('.hbs', exphbs({
    defaultLayout: 'main', 
    layoutsDir: path.join(application.get('views'), 'layouts'),
    partialsDir: path.join(application.get('views'), 'partials'),
    extname: '.hbs'
}));

application.set('view engine', '.hbs');

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

application.use(function(req, res, next) {
    res.locals.success_msm = req.flash('success_msm');
    res.locals.failure_msm = req.flash('failure_msm');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

application.use(require('./routes/index'));
application.use(require('./routes/users'));
application.use(require('./routes/geoloc'));

application.use(express.static(path.join(__dirname, 'public')));

application.listen(application.get('port'), () => {
    console.log('Server on port', application.get('port'))
});

