const express = require('express');
const router = express.Router();

const nameService = require('../services/name');

router.post('/save',saveName);
router.get('/get/:name',getName);
router.post('/search',searchName);
router.get('/random',getRandomName);
router.get('/health',healthStatus);
router.get('/getUsers',getUsers);
router.post('/loginUser',loginUser);


async function loginUser(req,res){
    if(req.body.email == "iqbal@zi.com" && req.body.password == "passW0rd"){
        return res.status(200).json({result : true});
    }

    return res.status(200).json({result : false, error : "Invalid Username Or wrong password"});
}
async function saveName(req,res){
    const save = await nameService.saveName(req.body)
    res.status(200).json({result : true});
}

async function getName(req,res){
    const name = await nameService.getName(req.params.name);
    res.status(200).json(name);
}

async function searchName(req,res){
    const names = await nameService.searchName({
        numberOfVowels : req.body.numberOfVowels || 0,
        numberOfRepeatingCharacter : req.body.numberOfRepeatingCharacter || 0,
        numberOfAdjacentCharacters : req.body.numberOfAdjacentCharacters || 0,
        length : req.body.length || 0
    })
    res.status(200).json({result : true, names : names});
}

async function getRandomName(req,res){
    const name = await nameService.getRandomName();
    res.status(200).json(name);
}

async function healthStatus(req,res){
    res.status(200).json({result : true});
}
async function getUsers(req,res){
    const data = [
        {
           "username":"shifna usman",
           "email":"abc@gmail.com",
           "password":"12345678"
        },
        {
           "username":"rahul",
           "email":"qwerty@gmail.com",
           "password":"qwerty123"
        },
        {
            "username":"raju",
            "email":"raju@gmail.com",
            "password":"raju1234"
        }
    ]
    res.status(200).json({result : true,data});
}
module.exports = router;