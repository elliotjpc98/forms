const express = require('express');
const router = express.Router();
const {readFile} = require('fs').promises;
//Work goes here

router.get("/", async (req, res) =>{
    //Get 5 words, with their pos and def and send back to the other page
    let chosenWords = await getWords();
    //send those back and render quiz.ejs
    console.log("Chosen words: ", chosenWords);
    res.render('quiz', {chosenWords});
});
router.post("/", (req, res)=>{
    console.log(req.body);
    let {userChoice, correctDef, totalQuestions, totalCorrect} = req.body;
    if(userChoice === correctDef)
    {
        console.log("User Guessed Correctly!");
        let score = totalCorrect+1;
    }
    let total = totalQuestions+1;

    let score = totalCorrect;
    let answerResult = 'incorrect';
    if(userChoice === correctDef) {
        score = parseInt(totalCorrect)+1;
        answerResult = 'correct';
    }
    let chosenWords = await getWords();
    res.render('quiz', {chosenWords:chosenWords, totalQuestions: parseInt(totalQuestions)+1, 
        totalCorrect: score, 
        answerResult:answerResult,
        lastcorrectDef: correctDef
    })
    //Get another new set of words...how?
    //Send that set of words back with the user score and their total questions
    //Send some other data back?
});
let getWords = async ()=>{
    //get a random part of speech
    console.log("Getting random Part!");
    let randomPart = getRandomPart(); //i should have noun, verb, or adjective
    //based on that, pick 4 words that match
    console.log("Random part: ",randomPart);
    let allWords = await readFile('resources/allwords.txt', 'utf8'); //Reads allwords as 1 giant string
    // console.log(allWords);
    let wordArray = allWords.split('\n'); //splits the single strong into an array where each line is an index
    // console.log(wordArray);
    shuffle(wordArray); //shuffle that array

    let choices = [];
    while(choices.length < 5){ //keep looping until we get 5 choice
        let line = wordArray.pop(); //one line as a string
        // let[word, part, def] = line.split('\t'); This is the same as the code below
        let tokens = line.split('\t');
        let word = tokens[0];
        let part = tokens[1];
        let def = tokens[2];
        if(part === randomPart){ //If the part of my word matches the random part we picked, we keep it
            choices.push(line);
        }
    }
    return choices;

}

let getRandomPart = ()=>{
    let parts = ['noun', 'verb', 'adjective'];
    let randomIndex = Math.floor(Math.random()*parts.length);
    let getRandomPart = parts[randomIndex];
    return getRandomPart;
}
let shuffle = (array)=>{
    //fisher Yates algorithm
    for(let i = array.length-1;i >0; i--)
    {
        let randomNumber = Math.floor(Math.random()*(i+1));
        [array[i], array[randomNumber]]  = [array[randomNumber], array[i]];
    }

}

module.exports = router;