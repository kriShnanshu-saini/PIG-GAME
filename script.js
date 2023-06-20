// Elements
const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");
const score0El = document.getElementById("score-0");
const score1El = document.getElementById("score-1");
const current0El = document.getElementById("current-0");
const current1El = document.getElementById("current-1");
const diceEl = document.querySelector(".dice");
const winnerEl = document.querySelector(".winner");
const nameBoard0 = document.getElementById("player--0");
const nameBoard1 = document.getElementById("player--1");
const winnerName = document.getElementById("winner-name");
const overlay = document.querySelector(".overlay");

// Buttons
const btnNew = document.querySelector(".new-game");
const btnRoll = document.querySelector(".roll-dice");
const btnHold = document.querySelector(".hold");
const btnClose = document.querySelector(".close-btn");

// Variables
let activePlayer, scores, currentScore, playing;

const init = function () {
    // initial conditions
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add("hidden");

    activePlayer = 0;
    currentScore = 0;
    scores = [0, 0];
    playing = true;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player-winner");
    player1El.classList.remove("player-winner");
    player0El.classList.add("player-active");
    player1El.classList.remove("player-active");
};
init();

const switchPlayer = function () {
    // making current score of active player 0
    document.getElementById(`current-${activePlayer}`).textContent = 0;

    // initializing currentScore = 0
    currentScore = 0;

    // switching active Player
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player-active");
    player1El.classList.toggle("player-active");
};

btnRoll.addEventListener("click", function () {
    if (playing) {
        // displaying dice
        diceEl.classList.remove("hidden");

        // generating a random number
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        diceEl.textContent = randomNumber;
        if (randomNumber !== 1) {
            // adding score
            currentScore += randomNumber;
            document.getElementById(`current-${activePlayer}`).textContent =
                currentScore;
        } else {
            // switching player
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
        // holding the current Score value
        scores[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent =
            scores[activePlayer];

        // checking for winner
        if (scores[activePlayer] >= 20) {
            playing = false;
            document.getElementById("winner-name").textContent = `Player ${
                activePlayer + 1
            }`;

            // show winner modal
            winnerEl.classList.remove("hidden");
            overlay.classList.remove("hidden");
            diceEl.classList.add("hidden");
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", init);

const closeModal = function () {
    winnerEl.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnClose.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !winnerEl.classList.contains("hidden")) {
        closeModal();
    }
});
