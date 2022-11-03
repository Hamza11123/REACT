const mongoose = require('mongoose');
const { 
    Schema 
} = mongoose;

 

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    title: {type: String, required: true},
    description: {type: String, required: true},
    tag: {type: String, default: "General"},
    date: {type: Date, date: Date.now}  // Don't Call like this -> 'Date.now()', We're Passing Refference Of The Function
});


// Creating & Exporting a Model Through Schema 
const Notes = mongoose.model('notes', NotesSchema);
module.exports = Notes;


