const helpers = {};

/**
 * This method helps to validate an user is already registered
 * 
 * @param {String} req - Request made by the app
 * @param {String} res - Response to the app
 * @param {Function} next - Continues where method was called
 */

helpers.isAuth = function(req, res, next){
    if(req.isAuthenticated()){
        //Goes to next step
        return next();
    }
    //User does not exist
    req.flash('error', 'Please, validate your credentials if you are already registered or create an account');
    res.redirect('/users/signin');
};

// This allows helpers to be called from other server files
module.exports = helpers;