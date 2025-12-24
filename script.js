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

terain.forEach((square) => {
  let currentDiv = document.getElementsByClassName(`div${x}`);
  let htmlElement = document.createElement("div");
  htmlElement.id = square[0] + square[1];
  htmlElement.style.border = "2px solid black";
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
      console.log("Not a valid word");
      return;
    }
    validateWord(word);
  }
}
function letter(input){

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
    input == "Α" ||
    input == "Β" ||
    input == "Γ" ||
    input == "Δ" ||
    input == "Ε" ||
    input == "Ζ" ||
    input == "Η" ||
    input == "Θ" ||
    input == "Ι" ||
    input == "Κ" ||
    input == "Λ" ||
    input == "Μ" ||
    input == "Ν" ||
    input == "Ξ" ||
    input == "Ο" ||
    input == "Π" ||
    input == "Ρ" ||
    input == "Σ" ||
    input == "Τ" ||
    input == "Υ" ||
    input == "Φ" ||
    input == "Χ" ||
    input == "Ψ" ||
    input == "Ω" 
  ) {
    if (word.length == 5) return;
    word += input;

    let box = document.getElementById(
      `${arrOfSquaresNum[whichBox]}${arrOfSquaresChar[whichRow]}`
    );
    box.innerHTML = `<p style = "font-size: 45px; text-align: center;">${input}</p>`;
    whichBox++;
  }else if(input=="Enter"){
    enter ();
  }
  console.log(word);
};


function validateWord(wordToValidate) {
  let greenWords = [];
  let nonGreenLetters = [];
  let orangeLetters = [];
  let greyLetters = [];
  let wordToGuessAfterGreen = wordToGuess
  for(let i = 0;i<5;i++){
    if(wordToValidate[i]==wordToGuessAfterGreen[i]){
      greenWords.push([wordToValidate[i],i,0])
      
      let x = wordToGuessAfterGreen.split("")
      x[i] = "-"
      wordToGuessAfterGreen = x.join("")
    }else{
      nonGreenLetters.push([wordToValidate[i],i])
    }
  }
  
  for(let i = 0; i<nonGreenLetters.length;i++){
    for(let j = 0;j<wordToGuessAfterGreen.length;j++){
      if(nonGreenLetters[i][0]==wordToGuessAfterGreen[j]){
        nonGreenLetters[i][2]=1
        orangeLetters.push(nonGreenLetters[i])
        break;
      }else{
        nonGreenLetters[i][2]=2
        greyLetters.push(nonGreenLetters[i])
      }
    }
  }
  console.log('this is orange'+ orangeLetters)
  for(let i = 0 ;i<greyLetters.length;i++){
    for(let j = i+1;j<orangeLetters.length;j++){
      if(greyLetters[i][0]==orangeLetters[j][0] && greyLetters[i][1]==orangeLetters[j][1]){
        greyLetters.splice(i,1);
      }
    }
  }
  let originalDuplicates=[];
  for (let i = 0; i < wordToGuess.length; i++) {
    let count=0;
    for(let j = 0; j < wordToGuess.length; j++) {
      if(wordToGuess[i]==wordToGuess[j]){
        count++
      }
    }
    originalDuplicates.push([wordToGuess[i],count])
  }
  let orangeDuplicates=[];
  for (let i = 0; i < nonGreenLetters.length; i++) {
    let count=0;
    for(let j = 0; j < nonGreenLetters.length; j++) {
      if(nonGreenLetters[i][0]==nonGreenLetters[j][0]){
        count++
      }
    }
    orangeDuplicates.push([nonGreenLetters[i][0],count])
  }
  if(orangeDuplicates.length>0){
    for(let i=0;i<originalDuplicates.length;i++){
      for(let j = 0; j<orangeDuplicates.length;j++){
        if(originalDuplicates[i][0]==orangeDuplicates[j][0] && 
          originalDuplicates[i][1]<orangeDuplicates[j][1]
        ){
          orangeDuplicates[j]=originalDuplicates[i]
          orangeDuplicates.splice(j+1,1)
          break;
        }
      }
    }
  }
  
  let orDup = orangeDuplicates.map(JSON.stringify).filter((e,i,a) => i === a.indexOf(e)).map(JSON.parse)
  let finalOrangeLetters = [];
  for(let i = 0;i<orDup.length;i++){
    let ordArray = [];
    for(let j = 0;j<orangeLetters.length;j++){
      if(orangeLetters[j][0]==orDup[i][0]){
        ordArray.push(orangeLetters[j])
      }
    }
    if(ordArray.length>orDup[i][1]){
      while(ordArray.length>orDup[i][1]){
        ordArray[ordArray.length -1][2]=2
        greyLetters.push(ordArray[ordArray.length -1])
        ordArray.pop();
      }
      finalOrangeLetters=[...finalOrangeLetters,...ordArray];
    }
  }

  if(finalOrangeLetters.length>0){
    for(let i = 0; i < orangeLetters.length; i++) {
      for (let j = 0; j < finalOrangeLetters.length; j++) {
        if(orangeLetters[i][0]!=finalOrangeLetters[j][0] ){
          finalOrangeLetters.push(orangeLetters[i]);
        }
      }
    }
  }else{
    finalOrangeLetters = orangeLetters;
  }

  let finalColorLetters = [...greyLetters,...finalOrangeLetters,...greenWords];

  for (let i = 0; i < finalColorLetters.length; i++) {
    let box = document.getElementById(`${arrOfSquaresNum[finalColorLetters[i][1]]}${arrOfSquaresChar[whichRow]}`);
    setTimeout(() => {
      if(finalColorLetters[i].length==3 ){
        if(finalColorLetters[i][2]==0){
          box.style.backgroundColor = "green";
          document.getElementById(`${finalColorLetters[i][0]}`).style.backgroundColor = "green";
        }else if(finalColorLetters[i][2]==1){
          box.style.backgroundColor = "orange";
          document.getElementById(`${finalColorLetters[i][0]}`).style.backgroundColor = "orange";
        }else if(finalColorLetters[i][2]==2){
          box.style.backgroundColor = "silver";
          document.getElementById(`${finalColorLetters[i][0]}`).style.backgroundColor = "grey";
        }
      }
    }, 20+i*20);
  }

  if ( wordToGuessAfterGreen == "-----") { //ΤΟ ΟΠΟΙΟ ΣΗΜΑΙΝΕΙ ΟΤΙ ΕΙΝΑΙ ΟΛΑ ΠΡΑΣΙΝΑ
    console.log("gg");
  } else {
    console.log("not gg");
    whichRow++;
    whichBox = 0;
    word = "";
  }
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

document.addEventListener("click",function(e){
  let x = e.target.value;
  letter(x)
})