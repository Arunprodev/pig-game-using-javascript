'use strict';

let scoreEl1 = document.getElementById('score--0');
let scoreEl2 = document.getElementById('score--1');
let currentEl1 = document.getElementById('current--0');
let currentEl2 = document.getElementById('current--1');
let dicsEl = document.querySelector('.dice');
let currentScore = 0;
let activePlayer = 0;
let activeScore = [0, 0];
let contineGame = true;

let changeActivePlayer = player => {
  let playerEl1 = document.querySelector(`.player--${player}`);
  playerEl1.classList.toggle('player--active');
};

let winner = player => {
  contineGame = false;
  dicsEl.classList.toggle('hidden');
  let playerEl1 = document.querySelector(`.player--${player}`);
  playerEl1.classList.add('player--winner');
};

let winnerChanges = player => {
  let currentPlayer = document.getElementById(`score--${player}`);
  activeScore[activePlayer] += currentScore;
  currentPlayer.textContent = activeScore[activePlayer];
  currentScore = 0;
  const currentScoreEl = document.getElementById(`current--${player}`);
  currentScoreEl.textContent = 0;
};

//Resetting the value
let resettingGame = () => {
  scoreEl1.textContent = 0;
  scoreEl2.textContent = 0;
  currentEl1.textContent = 0;
  currentEl2.textContent = 0;
  dicsEl.classList.toggle('hidden');
};

resettingGame();

//Start Rolling the dice

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (contineGame) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    const currentScoreEl = document.getElementById(`current--${activePlayer}`);
    dicsEl.classList.remove('hidden');
    dicsEl.src = `img/dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      currentScoreEl.textContent = currentScore;
      if (currentScore + activeScore[activePlayer] >= 100) {
        winnerChanges(activePlayer);
        winner(activePlayer);
      }
    } else {
      currentScore = 0;
      currentScoreEl.textContent = 0;
      changeActivePlayer(activePlayer);
      activePlayer = activePlayer > 0 ? 0 : 1;
      changeActivePlayer(activePlayer);
    }
  }
});

//While clicking the hold button

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (contineGame) {
    let maxScore = activeScore[activePlayer];
    if (!(maxScore + currentScore >= 100)) {
      winnerChanges(activePlayer);
      changeActivePlayer(activePlayer);
      activePlayer = activePlayer > 0 ? 0 : 1;
      changeActivePlayer(activePlayer);
    } else {
      winner(activePlayer);
    }
  }
});

//While resetting the game

document.querySelector('.btn--new').addEventListener('click', function () {
  if (
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.contains('player--winner')
  ) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  }
  activePlayer = 0;
  currentScore = 0;
  activeScore = [0, 0];
  contineGame = true;
  dicsEl.classList.remove('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  resettingGame();
});
