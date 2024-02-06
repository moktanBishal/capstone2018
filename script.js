let deck2 = [13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8,
  5, 6, 7, 8, 9, 1, 2, 3, 11, 12, 13, 4, 10,
  1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9];

const game = document.getElementById("game");
const round = document.getElementById("round");

const deckOfCard = document.createElement("p");
deckOfCard.innerHTML = `Deck of card: ${deck2}`;
game.appendChild(deckOfCard);

const shuffleDeck = document.createElement('button');
shuffleDeck.textContent = "Shuffle Deck";
shuffleDeck.addEventListener('click', () => {
  resetGame();
  shuffle();
});

const startGameButton = document.createElement('button');
startGameButton.textContent = "Start Game";
startGameButton.addEventListener('click', () => {
  resetGame();
  startGame();
});

const resetGameButton = document.createElement('button');
resetGameButton.textContent = "Reset Game";
resetGameButton.addEventListener('click', () => {
  resetGame();
});


game.appendChild(shuffleDeck);
game.appendChild(startGameButton);
game.appendChild(resetGameButton);

function resetGame() {
  round.innerHTML = '';
}

function shuffle() {
  for (let k = 0; k < 4; k++) {
    // Shuffle the deck of cards using Fisher-Yates algorithm
    for (let i = deck2.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck2[i], deck2[j]] = [deck2[j], deck2[i]];
    }
  }

  const shuffleDeckOfCard = document.createElement("p");
  shuffleDeckOfCard.innerHTML = `Shuffled deck of cards: ${deck2}`;
  round.innerHTML = '';
  round.appendChild(shuffleDeckOfCard);
}

function startGame() {
  const pickedCard = document.createElement('h3');

  // Pick a random card from the shuffled deck
  let pickedIndex = Math.floor(Math.random() * deck2.length);
  let picked = deck2[pickedIndex];

  pickedCard.textContent = `You picked ${picked}`;
  round.appendChild(pickedCard);

  deck2.splice(pickedIndex, 1); // removed the picked card from the deck

  let deck = deck2.slice(pickedIndex).concat(deck2.slice(0, pickedIndex));

  const test = document.createElement('p');
  test.textContent = `Deck: ${deck2.slice(pickedIndex).concat(deck2.slice(0, pickedIndex))}`;
  round.appendChild(test);

  // Split the deck into two arrays, a and b
  let a = [];
  let b = [];

  for (let i = 0; i < deck.length; i++) {
    i % 2 === 0 ? a.push(deck[i]) : b.push(deck[i]);
  }

  // Initialize the index counter
  let k = 0;

  // Use setInterval for a delayed loop with 1-second intervals
  const intervalId = setInterval(() => {
    const play = document.createElement('p');
    if (k < deck.length) {
      play.innerHTML = `<h5>Round ${k + 1}</h5>  ${a[k]} vs ${b[k]}`;
      round.appendChild(play);
      // Check if the picked card matches with player A's card
      if (picked === a[k]) {
        clearInterval(intervalId); // Stop the interval when A wins
        alert("A wins!");
      }
      // Check if the picked card matches with player B's card
      else if (picked === b[k]) {
        clearInterval(intervalId); // Stop the interval when B wins
        alert("B wins!");
      }
      k++;
    } else {
      clearInterval(intervalId); // Stop the interval when the loop completes
      alert("No winner in this round.");
    }
  }, 1500); // Delay each iteration by 1 second
}
