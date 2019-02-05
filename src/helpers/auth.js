const helpers = {};

helpers.isAuth = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    req.flash('error', 'Please, validate your credentials if you are already registered or create an account');
    res.redirect('/users/signin');
};

module.exports = helpers;