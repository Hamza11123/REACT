const mongoose = require('mongoose');
const { Schema } = mongoose;    // Destructing 'Schema' From 'mongoose'

 

const UserSchema = new Schema({
    
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: {type: Date, date: Date.now}  // Don't Call like this -> 'Date.now()', We're Passing Refference Of The Function
});


// Creating & Exporting a Model Through Schema 
const User =  mongoose.model('user', UserSchema);
User.createIndexes();
// module.exports =  mongoose.model('user', UserSchema);;
module.exports = User;


