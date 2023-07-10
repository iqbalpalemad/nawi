const express = require('express');
const router = express.Router();

const nameService = require('../services/name');

router.post('/save',saveName);
router.get('/get/:name',getName);
router.post('/search',searchName);


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
        muslim : req.body.muslim || false,
        christian : req.body.christian || false,
        hindu : req.body.hindu || false,
        length : req.body.length || 0
    })
    res.status(200).json(names);
}

module.exports = router;