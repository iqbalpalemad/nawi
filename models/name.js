const mongoose = require('mongoose');
const nameSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    },
    numberOfVowels : {
        type : Number
    },
    numberOfRepeatingCharacter : {
        type : Number
    },
    numberOfAdjacentCharacters : {
        type : Number
    },
    length : {
        type : Number
    },
});

module.exports = mongoose.model('name',nameSchema);