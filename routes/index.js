const express = require('express');
const router = express.Router();
const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

// let words = ["classroom", "tennessee", "atlanta", "cat"];
let randomWord  = words[Math.floor(Math.random() * words.length)];
let mysteryWord= [];


router.get("/", function(req, res){
  if (mysteryWord == "") {
     randomWord;
    for (var i = 0; i < randomWord.length; i++) {
      let character =
        {
        character : randomWord[i],
        placeholder: "_"
        }
        mysteryWord.push(character);
    }
  }
    let remainingGuesses = {remainingGuesses: 8}
    
    mysteryWord.push(remainingGuesses);

  res.render("game", {mysteryWord: mysteryWord});

});


router.post('/game', function(req, res) {
  let guessedLetter = req.body.character;
  if(randomWord.includes(guessedLetter)) {
    mysteryWord.forEach(function(single) {
      if (single.character == req.body.character) {
        single.guessed = true;
        res.redirect('/');
      }
    })
  }else {
    let guess = {singleGuess: req.body.character}
    mysteryWord.push(guess)
    res.redirect('/')
  }
});


module.exports = router;
