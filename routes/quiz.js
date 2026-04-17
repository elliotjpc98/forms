const express = require('express');
const router = express.Router();
const {readFile} = require('fs').promises;
//Work goes here

router.get("/", (req, res) =>{
    //Get 4 words, with their pos and def and send back to the other page

    //send those back and render quiz.ejs
});

let getWords = async ()=>{
    //get a random part of speech
    let randomPart = getRandomPart();
    //based on that, pick 4 words that match

}

let getRandomPart = ()=>{
    let parts = ['noun', 'verb', 'adjective'];
    let randomIndex = Math.floor(Math.random()*parts.length);
    let getRandomPart = parts[randomIndex];
    return getRandomPart;
}
let shuffle = (array)=>{
    //fisher Yates algorithm
    for(let i = 0;i<array.length-1;i--)
    {
        let randomNumber = Math.floor(Math.random()*(i+1));
        [array[i], array[randomNumber]]  = [array[randomNumber], array[i]];
    }
}

module.exports = router;