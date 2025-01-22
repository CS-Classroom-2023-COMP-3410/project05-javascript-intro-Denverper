const cardGrid = document.getElementById('card-grid');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart-button');

let moves = 0;
let timer;
let timeElapsed = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Card symbols (adjust as needed)
const symbols = ['🍎', '🍌', '🍓', '🍇', '🍑', '🍒', '🍍', '🥝'];
let cards = [];

// Initialize the game
function initGame() {
    cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    cardGrid.innerHTML = '';
    moves = 0;
    matchedPairs = 0;
    timeElapsed = 0;
    movesDisplay.textContent = moves;
    timerDisplay.textContent = '0:00';

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

    cards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        cardGrid.appendChild(card);
    });
}

// Update the timer
function updateTimer() {
    timeElapsed++;
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Flip a card
function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

// Check if the two flipped cards match
function checkMatch() {
    lockBoard = true;
    moves++;
    movesDisplay.textContent = moves;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === symbols.length) {
            clearInterval(timer);
            alert(`You won in ${moves} moves and ${timeElapsed} seconds!`);
        }

        resetTurn();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.classList.remove('flipped');
            secondCard.textContent = '';
            resetTurn();
        }, 1000);
    }
}

// Reset the turn
function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Restart the game
restartButton.addEventListener('click', initGame);

// Start the game on page load
initGame();
