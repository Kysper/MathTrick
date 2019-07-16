  //Elements
  const elements = {
    inputNumber: document.getElementById("number"),
    guessedNumber: document.getElementById("guessed-number"),
    submitNumber: document.getElementById("submit-number"),
    playerChoice: document.getElementById("player-choice"),
    computerChoice: document.getElementById("computer-choice"),
    turnDisplay: document.getElementById("turn-display"),
    finishTrick: document.getElementById("finished-game"),
    gameFinish: document.getElementById("game-finished"),
    btn:document.getElementsByClassName('btn')
  };

  let rounds = 0;
  let hasGuessed = false;
  let num = 0;
  let currentPlayer = 0;

  function determineTurn() {
    if (currentPlayer === 0) {
      setTimeout(() => {
        user();
      }, 100);
    } else if (currentPlayer === 1) {
      setTimeout(() => {
        computer();
      }, 100);
    }
  }

  elements.submitNumber.addEventListener("click", function(e) {
    e.preventDefault();
    num = elements.inputNumber.value;
    if (num <= 9999 && num >= 1000) {
      nextRound();
    } else {
      alert("Please type in a number between 1000 and 9999");
    }
    elements.inputNumber.value = "";
  });
  function user() {
    elements.turnDisplay.textContent = "";
    elements.turnDisplay.textContent = `It is the player's turn!`;
    displayNum(num, null);
  }

  function computer() {
    if (!hasGuessed) {
      makeGuess(num);
      hasGuessed = true;
    }
    if (rounds > 1) {
      elements.turnDisplay.textContent = "";
      elements.turnDisplay.textContent = `It is the computer's turn!`;
      let guess = 9999 - num;
      displayNum(null, guess);
    }
    if(rounds >= 5){
      elements.inputNumber.disabled = true;
    elements.finishTrick.innerText = "Add them up and see that the numbers match the total that the computer guessed at the beginning!";
    finishGame();
    }
  nextRound();
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
      const html = `Player: ${temp}`;
      let node = document.createElement("li");
      node.append(html);
      elements.playerChoice.appendChild(node);
      temp = null;
    } else if (currentPlayer === 1) {
      let temp = guess;
      setTimeout(() => {
        const html = `Computer: ${temp}`;
        let node = document.createElement("li");
        node.append(html);
        elements.computerChoice.appendChild(node);
        temp = null;
      }, 500);
    }
  }

  function makeGuess(number) {
    total = parseInt(number) + 20000 - 2;
    if (total !== NaN) {
      elements.guessedNumber.innerHTML = total;
      total = 0;
    }
    elements.inputNumber.innerHTML = "";
    return number;
  }

  function finishGame(){
    const html = `Would you like to play again?<button class='btn' data='yes'>Yes</Button>`
    elements.gameFinish.innerHTML = html;
   if(elements.btn.data === 'yes'){
     window.location.reload('false');
   }
  }