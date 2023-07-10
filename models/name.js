const mongoose = require('mongoose');
const nameSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    },
    muslim : {
        type : Boolean ,
        default : false
    },
    christian : {
        type : Boolean ,
        default : false
    },
    hindu : {
        type : Boolean ,
        default : false
    },
    length : {
        type : Number
    },
});

module.exports = mongoose.model('name',nameSchema);