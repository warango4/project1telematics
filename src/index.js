const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mOverride = require('method-override');
const expSession = require('express-session');

const application = express();
require('./database');

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
application.use(mOverride('_method'));
application.use(expSession({
  secret: 'thisIsMySecret',
  resave: true,
  saveUninitialized: true
}));

application.use(require('./routes/index'));
application.use(require('./routes/notes'));
application.use(require('./routes/users'));

application.use(express.static(path.join(__dirname, 'public')));

application.listen(application.get('port'), () => {
  console.log('Server on port', application.get('port'))
});
