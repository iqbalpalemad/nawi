const mongoose = require('mongoose');
const name = require('../models/name');
const functions = require('../utils/functions');

exports.saveName = async function(nameObject){
    const nameArray = nameObject.name.split(',');
    const names = [];
    for(let name of nameArray){
        names.push({
            name : name.toLowerCase(),
            length : name.length,
            numberOfVowels : functions.countVowels(name),
            numberOfRepeatingCharacter : functions.countRepeatingLetters(name),
            numberOfAdjacentCharacters : functions.countAdjacentRepeatingLetters(name)
        })
    }
    try{
        const result = await name.insertMany(names,{ordered: false,writeConcern: { w: "majority" }});
    } catch (error) {
        console.error('Error saving user:', error);
    }
}

exports.getName = async function(key){
    try{
        const result = await name.findOne({name : key});
        if(result){
            return result;
        }
        return {};
    }
    catch (error) {
        return {}
    }
}


exports.searchName = async function(searchObject){
    try{
        const result = await name.find({
            ...(searchObject.muslim) && {muslim : searchObject.muslim},
            ...(searchObject.christian) && {christian : searchObject.christian},
            ...(searchObject.hindu) && {hindu : searchObject.hindu},
            length : searchObject.length
        });
        if(result){
            return result;
        }
        return {};
    }
    catch (error) {
        return {}
    }
}