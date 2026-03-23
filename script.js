let arrOfSquaresNum = [1, 2, 3, 4, 5];
let arrOfSquaresChar = ["a", "b", "c", "d", "e", "f"];
let terain = [];
let realWordsArray = []

  generate().then(result => {
        getRealWordsArray(result);
    });;
let wordToGuess = ""; 
let screen = document.getElementById("form");

for (let i = 1; i <= arrOfSquaresChar.length; i++) {
  let textBoxGuess = document.createElement("textarea");
  textBoxGuess.id = `${i}guess`;
  textBoxGuess.style.display = "none";
}

for (let i = 0; i < arrOfSquaresChar.length; i++) {
  for (let j = 0; j < arrOfSquaresNum.length; j++) {
    terain.push([arrOfSquaresNum[j], arrOfSquaresChar[i]]);
  }
}

let x = 1;
let whichBox = 0;
let whichRow = 0;
let keyboardColors = {}; // tracks best color per key: 0=green, 1=orange, 2=grey

terain.forEach((square) => {
  let currentDiv = document.getElementsByClassName(`div${x}`);
  let htmlElement = document.createElement("div");
  htmlElement.id = square[0] + square[1];
  htmlElement.className = "wordBoxes"
  htmlElement.style.border = "2px solid #4a4a6a";
  htmlElement.style.width = "50px";
  htmlElement.style.height = "50px";
  htmlElement.style.margin = "5px";

  currentDiv[0].appendChild(htmlElement);
  if (square[0] % 5 == 0) {
    x++;
  }
});
let word = "";
addEventListener("keydown", (event) => {
  event.preventDefault();
  let key = event.key;
  letter(key)
})
addEventListener("keydown", (event) => {
  event.preventDefault();
  let key = event.key;
  if (key == "Enter" && word.length == 5) {
    enter();
  }
});
function enter (){
  if ( word.length == 5) {
    let isValidWord = isGuessingWordValid(word);
    if (!isValidWord) {
      return;
    }
    validateWord(word);
  }
}
function letter(input){
  let letterGiven = input.toString().toUpperCase();
  if (input == "Backspace") {
    if (word.length == 0) return;
    let wordInArray = word.split("");
    let x = wordInArray.splice(0, wordInArray.length - 1);
    word = x.join("");
    whichBox--;
    let box = document.getElementById(
      `${arrOfSquaresNum[whichBox]}${arrOfSquaresChar[whichRow]}`
    );
    box.innerHTML = ``;
  } else if (
    letterGiven == "Α" ||
    letterGiven == "Β" ||
    letterGiven == "Γ" ||
    letterGiven == "Δ" ||
    letterGiven == "Ε" ||
    letterGiven == "Ζ" ||
    letterGiven == "Η" ||
    letterGiven == "Θ" ||
    letterGiven == "Ι" ||
    letterGiven == "Κ" ||
    letterGiven == "Λ" ||
    letterGiven == "Μ" ||
    letterGiven == "Ν" ||
    letterGiven == "Ξ" ||
    letterGiven == "Ο" ||
    letterGiven == "Π" ||
    letterGiven == "Ρ" ||
    letterGiven == "Σ" ||
    letterGiven == "Τ" ||
    letterGiven == "Υ" ||
    letterGiven == "Φ" ||
    letterGiven == "Χ" ||
    letterGiven == "Ψ" ||
    letterGiven == "Ω" 
  ) {
    if (word.length == 5) return;
    word += input.toUpperCase();
    let box = document.getElementById(
      `${arrOfSquaresNum[whichBox]}${arrOfSquaresChar[whichRow]}`
    );
    box.innerHTML = `<p style = "font-size: 40px; color: white; text-align: center;">${input.toUpperCase()}</p>`;
    whichBox++;
  }else if(input=="Enter"){
    enter ();
  }
};


function validateWord(wordToValidate) {
  let result = new Array(5).fill(2);
  let targetAvailable = wordToGuess.split("");

  for (let i = 0; i < 5; i++) {
    if (wordToValidate[i] === targetAvailable[i]) {
      result[i] = 0;
      targetAvailable[i] = null; 
    }
  }


  for (let i = 0; i < 5; i++) {
    if (result[i] === 0) continue; 
    for (let j = 0; j < 5; j++) {
      if (targetAvailable[j] !== null && wordToValidate[i] === targetAvailable[j]) {
        result[i] = 1;
        targetAvailable[j] = null; 
        break;
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    let box = document.getElementById(`${arrOfSquaresNum[i]}${arrOfSquaresChar[whichRow]}`);
    let letter = wordToValidate[i];
    let colorCode = result[i];
    let color = colorCode === 0 ? "#4caf50" : colorCode === 1 ? "#e8a020" : "#353535";

    setTimeout(() => {
      box.style.backgroundColor = color;
      box.style.borderColor = color;
      let prev = keyboardColors[letter];
      if (prev === undefined || colorCode < prev) {
        keyboardColors[letter] = colorCode;
        let keyEl = document.getElementById(letter);
        if (keyEl) keyEl.style.backgroundColor = color;
      }
    }, 200 + i * 20);
  }

  let won = result.every(r => r === 0);
  let animDelay = 20 + 5 * 20 + 300;

  if (won) {
    setTimeout(() => showModal(true, whichRow + 1), animDelay);
  } else {
    whichRow++;
    whichBox = 0;
    word = "";
    if (whichRow >= arrOfSquaresChar.length) {
      setTimeout(() => showModal(false, 0), animDelay);
    }
  }
}

function showModal(won, attempts) {
  document.getElementById("modal-title").textContent = won
    ? `Μπράβο! Το βρήκες σε ${attempts} ${attempts === 1 ? "προσπάθεια" : "προσπάθειες"}!`
    : "Έχασες!";
  document.getElementById("modal-word").textContent = won
    ? ""
    : `Η λέξη ήταν: ${wordToGuess}`;
  document.getElementById("game-modal").style.display = "flex";
}

function restartGame() {
  document.getElementById("game-modal").style.display = "none";
  whichRow = 0;
  whichBox = 0;
  word = "";
  terain.forEach((square) => {
    let box = document.getElementById(`${square[0]}${square[1]}`);
    if (box) {
      box.innerHTML = "";
      box.style.backgroundColor = "";
      box.style.borderColor = "#4a4a6a";
    }
  });
  document.querySelectorAll(".Key-module_key__kchQI").forEach(btn => {
    btn.style.backgroundColor = "";
  });
  keyboardColors = {};
  wordToGuess = realWordsArray[Math.floor(Math.random() * realWordsArray.length)];
  console.log("Word to guess: " + wordToGuess);
}

function getRealWordsArray(result){
  realWordsArray = JSON.parse(result);
  wordToGuess = realWordsArray[Math.floor(Math.random() * realWordsArray.length)];
  console.log("Word to guess: " + wordToGuess);
}



async function generate() {
  const res = await fetch("http://localhost:3000/api/words" );

  const text = await res.text();

  return text;
}

function isGuessingWordValid(word) {
  return realWordsArray.includes(word);
}

function closeRulesModal() {
  document.getElementById("rules-modal").style.display = "none";
}

document.addEventListener("click",function(e){
  let x = e.target.value;
  if (x === undefined || x === "") return;
  letter(x)
})

