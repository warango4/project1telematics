const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    user: {type: String, required: true}, 
    email: {type: String, required: true},
    pass: {type: String, required: true},
    creatDate: {type: Date, default: Date.now}
});

userSchema.methods.encryptPass = async function(password){
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}; 

userSchema.methods.matchPass = async function (password){
    return await bcrypt.compare(password, this.pass);
}

module.exports = mongoose.model('User', userSchema);