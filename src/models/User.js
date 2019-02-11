const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

/**
 * With this schema, users can be saved in the database 
 * 
 * @param {String} user - User name
 * @param {String} email - Field that's going to be required for authentication
 * @param {String} password - The password the user is going to use to validate credentialls
 * @param {Date} creatDate - Date the user was created in database
 */

const userSchema = new Schema({
    user: {type: String, required: true}, 
    email: {type: String, required: true},
    pass: {type: String, required: true},
    creatDate: {type: Date, default: Date.now}
});

/**
 * This methods allows, through bcrypt module, to 
 * encrypt the password the user has given
 * 
 * @param {String} password - Password to encrypt
 */
userSchema.methods.encryptPass = async function(password){
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}; 

/**
 * Validate if entered password matches the saved encripted pass
 * 
 * @param {String} password - Password to compare with the one saved in database
 */

userSchema.methods.matchPass = async function (password){
    return await bcrypt.compare(password, this.pass);
}

// This allows to export this model so it can be used in other 
// server files 
module.exports = mongoose.model('User', userSchema);