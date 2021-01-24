const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    name : {
        type : String,
        required:true
    },
    genre : {
        type : String,
        required:true
    },
    language : {
        type : String,
        required:true
    },
    imagePath : {
        type : String,
        required:true
    },
    artist : {
        type : String,
        required:true
    },
    
}, {timestamps :  true}
);

module.exports = mongoose.model('Song',songSchema);