const express = require('express');
const router = express.Router();

const nameService = require('../services/name');

router.post('/save',saveName);
router.get('/get/:name',getName);
router.post('/search',searchName);
router.get('/random',getRandomName);


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

module.exports = router;