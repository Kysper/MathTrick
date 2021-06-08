//Elements
const elements = {
  inputNumber: document.getElementById("number"),
  guessedNumber: document.getElementById("guessed-number"),
  guessedMatch: document.getElementById("guessed-match"),
  submitNumber: document.getElementById("submit-number"),
  playerChoice: document.getElementById("player-choice"),
  computerChoice: document.getElementById("computer-choice"),
  turnDisplay: document.getElementById("turn-display"),
  finishTrick: document.getElementById("finished-game"),
  gameFinish: document.getElementById("game-finished"),
  btn: document.getElementsByClassName("btn"),
  playAgain: document.getElementById("play-again"),
};

let rounds = 0;
let hasGuessed = false;
let num = 0;
let sum = 0;
let currentPlayer = 0;
const guessArr = [];
function determineTurn() {
  if (currentPlayer === 0) {
    setTimeout(() => {
      user();
    }, 300);
  } else if (currentPlayer === 1) {
    setTimeout(() => {
      computer();
    }, 300);
  }
}

elements.submitNumber.addEventListener("click", function (e) {
  e.preventDefault();
  num = elements.inputNumber.value;
  if (num <= 9999 && num >= 1000) {
    guessArr.push(parseInt(num));
    nextRound();
  } else {
    elements.turnDisplay.textContent =
      "Please type in a number between 1000 and 9999";
  }
  elements.inputNumber.value = "";
});

function user() {
  elements.turnDisplay.textContent = "";
  elements.turnDisplay.textContent = `It is the player's turn!`;
  if (rounds >= 5) {
    elements.inputNumber.disabled = true;
    finishGame();
  }

  displayNum(num, 0);
}

function computer() {
  elements.turnDisplay.textContent = "";
  if (!hasGuessed) {
    elements.turnDisplay.textContent = `The computer is making a guess...`;
    setTimeout(() => {
      makeGuess(num);
    }, 400);

    hasGuessed = true;
  }
  if (rounds > 1 && rounds <= 5) {
    elements.turnDisplay.textContent = `The computer is thinking...`;
    let guess = 9999 - num;
    setTimeout(() => {
      displayNum(0, guess);
    }, 400);
    guessArr.push(guess);
  }
  if (rounds >= 5) {
    elements.inputNumber.disabled = true;
    elements.finishTrick.innerText =
      "Add them up and see that the numbers match the total that the computer guessed at the beginning!";
    finishGame();
  }
  setTimeout(() => {
    nextRound();
  }, 400);
}

function nextRound() {
  if (rounds <= 5) {
    if (currentPlayer === 0) {
      currentPlayer = 1;
      determineTurn();
    } else if (currentPlayer === 1) {
      currentPlayer = 0;
      determineTurn();
    }
  }

  rounds++;
}

function displayNum(number, guess) {
  if (currentPlayer === 0) {
    let temp = number;
    currentNumber(number);
    const html = `Player: ${temp}`;
    let node = document.createElement("li");
    node.append(html);
    elements.playerChoice.appendChild(node);
    temp = 0;
  } else if (currentPlayer === 1) {
    let temp = guess;
    currentNumber(guess);
    setTimeout(() => {
      const html = `Computer: ${temp}`;
      let node = document.createElement("li");
      node.append(html);
      elements.computerChoice.appendChild(node);
      temp = 0;
    }, 500);
  }
  elements.guessedMatch.textContent = sum;
}

function currentNumber(n) {
  n = parseInt(n);
  if (rounds < 1) {
    sum += n;
    return sum;
  }
  sum += n;
  return sum;
}

function makeGuess(number) {
  let total = parseInt(number) + 20000 - 2;
  if (total !== NaN) {
    elements.guessedNumber.innerHTML = total;
    total = 0;
  }
  elements.inputNumber.innerHTML = "";
  return number;
}

function finishGame() {
  elements.turnDisplay.innerHTML = `It's a match!`;
  elements.gameFinish.innerHTML = "Would you like to play again?";
  elements.playAgain.style.display = "block";
  elements.gameFinish.append(elements.playAgain)
  elements.playAgain.addEventListener("click",(e) => {
    window.location.reload();
  });
}
