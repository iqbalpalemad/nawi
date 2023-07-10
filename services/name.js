const mongoose = require('mongoose');
const name = require('../models/name');

exports.saveName = async function(nameObject){
    const newName = new name({
        name : nameObject.name.toLowerCase(),
        ...(nameObject.muslim) && {muslim: nameObject.muslim },
        ...(nameObject.christian) && {christian : nameObject.christian },
        ...(nameObject.hindu) && {hindu : nameObject.hindu },
        length : nameObject.name.length
    })
    try{
        await newName.save();
    } catch (error) {
        console.error('Error saving user:', error);
    }
}

exports.getName = async function(key){
    try{
        const result = await name.findOne({name : key});
        console.log(result);
        if(result){
            return result;
        }
        return {};
    }
    catch (error) {
        console.log(error);
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
        console.log(error);
        return {}
    }
}