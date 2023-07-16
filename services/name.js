const mongoose = require('mongoose');
const name = require('../models/name');
const functions = require('../utils/functions');

exports.saveName = async function(nameObject){
    const nameArray = nameObject.name.split(',');
    const names = [];
    for(let name of nameArray){
        names.push({
            name : name.toLowerCase().trim(),
            length : name.length,
            numberOfVowels : functions.countVowels(name),
            numberOfRepeatingCharacter : functions.countRepeatingLetters(name),
            numberOfAdjacentCharacters : functions.countAdjacentRepeatingLetters(name)
        })
    }
    try{
        const result = await name.insertMany(names,{ordered: false,writeConcern: { w: "majority" }});
        return result;
    } catch (error) {
        console.error('Error saving user:', error);
        return {};
    }
}

exports.getName = async function(key){
    try{
        const result = await name.findOne({name : key.trim()});
        if(result){
            return {result : true};
        }   
    }
    catch (error) {
    }
    return {result : false};
}

exports.searchName = async function(searchObject){
    const response = [];
    try{
        const result = await name.find({
            ...(searchObject.numberOfVowels) && {numberOfVowels : searchObject.numberOfVowels},
            ...(searchObject.numberOfRepeatingCharacter) && {numberOfRepeatingCharacter : searchObject.numberOfRepeatingCharacter},
            ...(searchObject.numberOfAdjacentCharacters) && {numberOfAdjacentCharacters : searchObject.numberOfAdjacentCharacters},
            length : searchObject.length
        });
        if(result){
            for(let name of result){
                if(name.name){
                    response.push(name.name);
                }
            }
        }
    }
    catch (error) {
    }
    return response;
}

exports.getRandomName = async function(){
    try {
        const count = await name.countDocuments().exec();
        const random = Math.floor(Math.random() * count);
        const document = await name.findOne().skip(random).exec();
        if(document && document.name){
            return {result : true,name : document.name};
        }
      } catch (err) {
        console.error(err);
      }
      return {result : false};
}